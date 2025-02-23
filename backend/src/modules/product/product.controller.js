
import slugify from 'slugify';
import categoryModel from './../../../db/models/category.model.js';
import subCategoryModel from './../../../db/models/subCategory.model.js';
import cloudinary from './../../utlis/cloudinary.js';
import productModel from '../../../db/models/product.model.js';
import { pagination } from '../../utlis/pagination.js';


export const create = async (req, res) => {
    try {
        const { name, price, discount, categoryId, subCategoryId } = req.body;

        // Check if category exists
        const checkCategory = await categoryModel.findById(categoryId);
        if (!checkCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        req.body.slug = slugify(name);
        req.body.finalPrice = price - ((price * (discount || 0)) / 100);

        // 🔹 Upload Main Image
        if (!req.files || !req.files.mainImage) {
            return res.status(400).json({ message: "Main image is required" });
        }
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.mainImage[0].path, {
            folder: `${process.env.APPNAME}/product/name`
        });

        req.body.mainImage = { secure_url, public_id };

        // 🔹 Upload Sub Images
        req.body.subImages = [];
        if (req.files.subImages) {
            for (const file of req.files.subImages) {
                const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
                    folder: `${process.env.APPNAME}/product/subImages`
                });
                req.body.subImages.push({ secure_url, public_id });
            }
        }

        // 🔹 Create Product
        const product = await productModel.create(req.body);
        return res.status(201).json({ message: "Success", product });

    } catch (error) {
        return res.status(500).json({ message: "Error creating product", error: error.message });
    }
};


// export const getProducts = async (req, res) => {
//     const { skip, limit } = pagination(req.query.page, req.query.limit);
//     let queryObj = { ...req.query };
//     const execQuery = ['page', 'limit', 'sort'];
//     execQuery.map((ele) => {
//         delete queryObj[ele];
//     });
//     queryObj = JSON.stringify(queryObj);
//     queryObj = queryObj.replace(/gt|gte|lt|lte|in|nin|eq/g, match => `$${match}`);
//     queryObj = JSON.parse(queryObj);
    
//     const mongoseQuery = productModel.find(queryObj).skip(skip).limit(limit);

//     // If search query is provided, add search functionality
//     if (req.query.search) {
//         mongoseQuery.find({
//             $or: [
//                 { name: { $regex: req.query.search, $options: 'i' } },
//                 { description: { $regex: req.query.search, $options: 'i' } }
//             ]
//         });
//     }

//     // Fetch count for pagination
//     const count = await productModel.estimatedDocumentCount();

//     try {
//         // Fetch products and populate category name
//         const products = await mongoseQuery
//             .sort(req.query.sort)
//             .select('name price discount categoryId') // Ensure categoryId is selected
//             .populate({
//                 path: 'categoryId', // Ensure you're populating categoryId
//                 select: 'name'  // Select only the category name
//             });

//         if (products.length === 0) {
//             return res.status(404).json({ message: 'No products found' });
//         }

//         return res.status(200).json({ message: "success", products });
//     } catch (error) {
//         console.error("Error during population:", error);
//         return res.status(500).json({ message: "Error populating category", error: error.message });
//     }
// };

export const getProducts = async (req, res) => {
    const { skip, limit } = pagination(req.query.page, req.query.limit);
    let queryObj = { ...req.query };
    const execQuery = ['page', 'limit', 'sort'];
    execQuery.map((ele) => {
        delete queryObj[ele];
    });
    queryObj = JSON.stringify(queryObj);
    queryObj = queryObj.replace(/gt|gte|lt|lte|in|nin|eq/g, match => `$${match}`);
    queryObj = JSON.parse(queryObj);
    
    const mongoseQuery = productModel.find(queryObj).skip(skip).limit(limit);

    // If search query is provided, add search functionality
    if (req.query.search) {
        mongoseQuery.find({
            $or: [
                { name: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } }
            ]
        });
    }

    // Fetch count for pagination
    const count = await productModel.estimatedDocumentCount();

    try {
        // Fetch products and populate category name
        const products = await mongoseQuery
            .sort(req.query.sort)
            .select('name price discount categoryId mainImage stock') // Ensure categoryId is selected
            .populate({
                path: 'categoryId', // Ensure you're populating categoryId
                select: 'name'  // Select only the category name
            });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        // Transform the product data to match the desired response format
        const transformedProducts = products.map(product => ({
            _id: product._id,
            name: product.name,
            price: product.price,
            discount: product.discount,
            category: product.categoryId.name ,// Extract the category name directly
            mainImage :product.mainImage,
            stock :product.stock
        }));

        return res.status(200).json({ message: "success", products: transformedProducts });
    } catch (error) {
        console.error("Error during population:", error);
        return res.status(500).json({ message: "Error populating category", error: error.message });
    }
};


// Update Product
export const update = async (req, res) => {
    const { productId } = req.params;
    const { name, price, discount, categoryId, subCategoryId } = req.body;

    const product = await productModel.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const checkCategory = await categoryModel.findById(categoryId);
    if (!checkCategory) {
        return res.status(404).json({ message: "Category not found" });
    }

    req.body.slug = slugify(name);
    req.body.finalPrice = price - ((price * (discount || 0)) / 100);

    if (req.files?.mainImage) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.mainImage[0].path, {
            folder: `${process.env.APPNAME}/product/name`,
        });
        req.body.mainImage = { secure_url, public_id };
    }

    req.body.subImages = [];
    if (req.files?.subImages) {
        for (const file of req.files.subImages) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
                folder: `${process.env.APPNAME}/product/subImages`,
            });
            req.body.subImages.push({ secure_url, public_id });
        }
    }

    const updatedProduct = await productModel.findByIdAndUpdate(productId, req.body, { new: true });
    return res.status(200).json({ message: "Product updated successfully", updatedProduct });
};

// Delete Product
export const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    const product = await productModel.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    await productModel.findByIdAndDelete(productId);
    return res.status(200).json({ message: "Product deleted successfully" });
};

// Get Products by Category Name
export const getProductsByCategory = async (req, res) => {
    const { categoryName } = req.query;

    const category = await categoryModel.findOne({ name: categoryName });
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    const products = await productModel.find({ categoryId: category._id });
    return res.status(200).json({ message: "Success", products });
};

// Get Products by Id
export const getProductsById = async (req, res) => {
    const { id } = req.params;

    const product = await productModel.findById( id );
    return res.status(200).json({ message: "Success", product });
};
