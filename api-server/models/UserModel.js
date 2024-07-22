import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  role: { type: String, required: true },
  address: { type: String, required: true },
  isActive: { type: Boolean,  required: true, default: true },
});



UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

export const User = mongoose.model("User", UserSchema);
