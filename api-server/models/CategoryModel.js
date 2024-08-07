import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  id: { type: Number, required: true, unique: true,index: true },
  name: { type: String, required: true }
});

export const Category = mongoose.model("Category", CategorySchema);

