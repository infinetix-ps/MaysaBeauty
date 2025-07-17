import { Schema, Types, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: false,
    },
    products: [
      {
        productId: {
          type: Types.ObjectId,
          ref: "Product",
          required: false,
        },
        quantity: {
          type: Number,
          default: 1,
          required: false,
        },
        unitPrice: {
          type: Number,
          required: false,
        },
        finalPrice: {
          type: Number,
          required: false,
        },
      },
    ],
    finalPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["cash", "visa"],
      default: "cash",
    },
    couponId: {
      type: Types.ObjectId,
      ref: "Coupon",
    },
    status: {
      type: String,
      default: "pending",
    },
    notes: {
      type: String,
    },
    rejectedReason: {
      type: String,
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = model("Order", orderSchema);
export default orderModel;
