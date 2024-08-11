import mongoose from "mongoose";

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
});

export const Wishlist = mongoose.model("wishlist", wishlistSchema);