import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CheckoutSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  address: { type: String, required: true},
  country: { type: String, required: true },
  state: { type: String, required: true},
  zip: { type: String, required: true},
  paymentMethod: { type: String, required: true},
  ccName: { type: String, required: true},
  ccNumber: { type: String, required: true},
  ccExpiration: { type: String, required: true},
  ccCvv: { type: String, required: true},
  total: { type: String},//total payment by user
  promoCode: { type: String},
  promoDiscount: { type: String},
  categoryDiscount: { type: String},
});

export const Checkout = mongoose.model("Checkout", CheckoutSchema);
