import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  id: { type: Number, required: true, unique: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  name: { type: String, required: true }
});

export const SubCategory = mongoose.model("SubCategory", SubCategorySchema);

