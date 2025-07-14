// import { Router } from "express";
// import * as controller from './order.controller.js';
// import { endPoints } from "./order.role.js";
// import { auth } from "../../middleware/auth.js";
// const router = Router();

// router.post('/',auth(endPoints.create),controller.create);

// export default router;



// routes/orders.routes.js
import express from 'express';
import Order from ''../../../db/models/order.model.js'';

const router = express.Router();

// CREATE Order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all Orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('products.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one Order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId').populate('products.productId');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE Order
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE Order
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

// import { Router } from "express";
// import orderModel from '../../../db/models/order.model.js';
// import { verifyToken } from "../../middleware/auth.js";
// import mongoose from 'mongoose';

// const router = Router();

// // ✅ Create Order
// router.post('/', verifyToken, async (req, res) => {
//     try {
//         const { products, finalPrice, address, phoneNumber, paymentType, couponId, notes } = req.body;

//         const newOrder = await orderModel.create({
//             userId: req.user.id,
//             products,
//             finalPrice,
//             address,
//             phoneNumber,
//             paymentType,
//             couponId,
//             notes,
//             updatedBy: req.user.id,
//         });

//         res.status(201).json(newOrder);
//     } catch (error) {
//         console.error('Error creating order:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // ✅ Get All Orders (Admin)
// router.get('/', async (req, res) => {
//     try {
//         // Optionally restrict to admin only using req.user.role
//         const orders = await orderModel.find()
//             .populate('userId', 'userName email')
//             .populate('products.productId', 'name price')
//             .populate('couponId', 'code discount')
//             .sort({ createdAt: -1 });

//         res.json(orders);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving orders' });
//     }
// });

// // ✅ Get Single Order by ID
// router.get('/:id', verifyToken, async (req, res) => {
//     try {
//         const order = await orderModel.findById(req.params.id)
//             .populate('userId', 'userName email')
//             .populate('products.productId', 'name price')
//             .populate('couponId', 'code discount');

//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         res.json(order);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving order' });
//     }
// });

// // ✅ Update Order
// router.put('/:id', verifyToken, async (req, res) => {
//     try {
//         const updated = await orderModel.findByIdAndUpdate(
//             req.params.id,
//             { ...req.body, updatedBy: req.user.id },
//             { new: true }
//         );

//         if (!updated) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         res.json(updated);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating order' });
//     }
// });

// // ✅ Delete Order
// router.delete('/:id', verifyToken, async (req, res) => {
//     try {
//         const deleted = await orderModel.findByIdAndDelete(req.params.id);

//         if (!deleted) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         res.json({ message: 'Order deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting order' });
//     }
// });

// export default router;
