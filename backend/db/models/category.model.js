import { Schema, Types, model } from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
    },
    image: {
        type: Object,
        required: false,
    },
    status: {
        type: String,
        default: 'Active',
        enum: ['Active', 'NotActive'],
    },
    index: {
        type: Number,
        required: true,  // If you want the index to be mandatory
        unique: true,    // If the index should be unique
        default: 0,      // Optional: Set a default value if desired
    },
    createdBy: { type: Types.ObjectId, ref: 'User' },
    updatedBy: { type: Types.ObjectId, ref: 'User' },
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

categorySchema.virtual("subCategory", {
    localField: '_id',
    foreignField: 'categoryId',
    ref: 'SubCategory'
});

const categoryModel = model('Category', categorySchema);
export default categoryModel;
