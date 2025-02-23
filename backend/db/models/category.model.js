import { Schema, Types, model } from 'mongoose';

const categorySchema = new Schema({
    name : {
        type:String,
        required: true,
        unique: true,
    },
    slug:{
        type:String,
        required: true,
    },
    image:{
        type:Object,
        required: false,
    },
    status:{
        type:String,
        default:'Active',
        enum:['Active','NotActive'],
    },
   createdBy:{type:Types.ObjectId,ref:'User'},
   updatedBy:{type:Types.ObjectId,ref:'User'},
},
{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
});

categorySchema.virtual("subCategory",{
    localField:'_id',
    foreignField:'categoryId',
    ref:'SubCategory'
})

const categoryModel = model('Category',categorySchema);
export default categoryModel;
