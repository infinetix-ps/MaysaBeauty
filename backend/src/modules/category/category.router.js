import { Router } from "express";
import * as controller from './category.controller.js'
import fileUpload, { fileTypes } from "../../utlis/multer.js";
import { auth } from './../../middleware/auth.js';
import subCategoryRouter from './../subCategory/subCategory.router.js';
import { endPoints } from "./category.role.js";
import { asyncHandler } from './../../utlis/catchError.js';

const router = Router();

router.use('/:id/subCategories',subCategoryRouter)
router.post('/',asyncHandler(controller.create))
router.get('/',asyncHandler(controller.getAll));
router.get('/active',auth(endPoints.active),asyncHandler(controller.getActive));
router.get('/:id',asyncHandler(controller.getDetails));
router.patch('/:id',auth(),fileUpload(fileTypes.image).single('image'),asyncHandler(controller.update));
router.delete('/:id',auth(),asyncHandler(controller.destroy));

export default router;