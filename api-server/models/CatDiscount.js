import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CatDiscountSchema = new Schema({
  id: { type: Number, required: true, unique: true,index: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  discount:{ type: String, required: true },
});

export const CatDiscount = mongoose.model("CatDiscount", CatDiscountSchema);

