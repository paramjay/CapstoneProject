import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  stock: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: String, required: true },
  salePrice: { type: String, required: true },
  description: { type: String, required: true },
});

export const Product = mongoose.model("Product", ProductSchema);

