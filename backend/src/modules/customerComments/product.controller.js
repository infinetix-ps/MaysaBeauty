
import slugify from 'slugify';
import categoryModel from './../../../db/models/category.model.js';
import subCategoryModel from './../../../db/models/subCategory.model.js';
import cloudinary from './../../utlis/cloudinary.js';
import productModel from '../../../db/models/product.model.js';
import { pagination } from '../../utlis/pagination.js';


export const create = async (req, res) => {
    const {name,price,discount,categoryId,subCategoryId}=req.body;

    const checkCategory =await categoryModel.findById(categoryId);
    if(!checkCategory){
        return res.status(404).json({message:"Category not found"});
    }

    // const checkSubCategory =await subCategoryModel.findOne({_id:subCategoryId,categoryId:categoryId});
    // if(!checkSubCategory){
    //     return res.status(404).json({message:"Sub Category not found"});
    // }

    req.body.slug = slugify(name);
    req.body.finalPrice = price - ((price * (discount || 0))/100);

    const {secure_url,public_id}= await cloudinary.uploader.upload(req.files.mainImage[0].path,
        {folder : `${process.env.APPNAME}/product/name`}
    );

    req.body.mainImage = {secure_url,public_id};
    req.body.subImages = [];

    for (const file of req.body.subImages){
        const {secure_url,public_id}= await cloudinary.uploader.upload(file.path,
            {folder : `${process.env.APPNAME}/product/subImages`}
        );
        req.body.subImages.push({secure_url,public_id});
    }
    const product = await productModel.create(req.body);
    return res.status(201).json({message:"success",product});
}

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
//                 { name: { $regex: req.query.search, $options: 'i' } }, // Added case-insensitive flag
//                 { description: { $regex: req.query.search, $options: 'i' } }
//             ]
//         });
//     }

//     // Fetch count for pagination
//     const count = await productModel.estimatedDocumentCount();

//     // Populate category name and select necessary fields
//     const products = await mongoseQuery
//         .sort(req.query.sort)
//         .select('name price discount categoryId') // Select categoryId to populate
//         .populate({
//             path: 'categoryId', // Assuming 'categoryId' is the reference field
//             select: 'name', // Fetch only the category name
//         });

//     return res.status(200).json({ message: "success", products });
// };

// Update Product

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
                { name: { $regex: req.query.search, $options: 'i' } }, // Added case-insensitive flag
                { description: { $regex: req.query.search, $options: 'i' } }
            ]
        });
    }

    // If categoryName query is provided, filter by category
    if (req.query.categoryName) {
        mongoseQuery.find({
            'categoryId.name': { $regex: req.query.categoryName, $options: 'i' } // Filter by category name
        });
    }

    // Fetch count for pagination
    const count = await productModel.estimatedDocumentCount();

    // Populate category name and select necessary fields
    const products = await mongoseQuery
        .sort(req.query.sort)
        .select('name price discount categoryId') // Select categoryId to populate
        .populate({
            path: 'categoryId', // Assuming 'categoryId' is the reference field
            select: 'name', // Fetch only the category name
        });

    return res.status(200).json({ message: "success", products });
};


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
