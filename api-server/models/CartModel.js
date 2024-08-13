import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  checkout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Checkout',
  },
  productName:{ type: String, required: true },
  price:{ type: String, required: true },// price of single product
  total:{ type: String, required: true },// price*quantity
  quantity: { type: String, required: true },
  size:{ type: String, required: true },
});

export const Cart = mongoose.model("Cart", CartSchema);
