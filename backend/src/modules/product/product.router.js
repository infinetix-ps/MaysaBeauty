import { Router } from "express";
import * as controller from './product.controller.js';
import { auth } from "../../middleware/auth.js";
import fileUpload, { fileTypes } from "../../utlis/multer.js";
import { asyncHandler } from './../../utlis/catchError.js';

const router = Router();

// Create Product
router.post('/', fileUpload(fileTypes.image).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 5 },
]), asyncHandler(controller.create));

// Get All Products
router.get('/', controller.getProducts);

// Update Product
router.put('/:productId', fileUpload(fileTypes.image).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 5 },
]), asyncHandler(controller.update));

// Delete Product
router.delete('/:productId', asyncHandler(controller.deleteProduct));

// Get Products by Category Name
router.get('/category', asyncHandler(controller.getProductsByCategory));

// Get Product
router.get('/:id', asyncHandler(controller.getProductsById));



export default router;
