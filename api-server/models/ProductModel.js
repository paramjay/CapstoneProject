import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: { type: Number, required: true, unique: true,index: true },
  category:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    require:true
  },
  subCategory:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    require:true
  },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  stock: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  
});

export const Product = mongoose.model("Product", ProductSchema);

