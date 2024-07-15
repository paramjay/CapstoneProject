// Import necessary libraries
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { User } from "../../models/UserModel.js";
import { Product } from "../../models/ProductModel.js";

// Define resolvers
const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const employees = await User.find({});
        return employees;
      } catch (error) {
        throw new Error('Error fetching users');
      }
    },
    getProducts: async () => {
      try {
        const products = await Product.find({});
        return products;
      } catch (error) {
        throw new Error('Error fetching products');
      }
    },
    loginAuth: async (_, { input }) => {
      try {
        // console.log("Get-data-from-Request");
        // console.log(input);
        const user = await User.find({username:input.username});
        // console.log("User-Found");
        // console.log(user);
        return user[0];
        // if(user.length>0){
        //   console.log("User-Found");
        //   return user;
        // }else{
        //   console.log("User-NotFound");
        //   return null;
        // }
      } catch (error) {
        throw new Error('Error fetching products');
      }
    }
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      console.log(input);

      // Validate input fields
      if (!input.username || !input.email || !input.password || !input.firstName || !input.lastName || !input.phone || !input.gender || !input.dob || !input.role) {
        throw new Error('All fields are required.');
      }

      // Validate email format
      if (!validator.isEmail(input.email)) {
        throw new Error('Invalid email format.');
      }

      // Validate phone number format
      if (!validator.isMobilePhone(input.phone, 'any', { strictMode: false })) {
        throw new Error('Invalid phone number format.');
      }

      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email: input.email });
      if (existingUser) {
        throw new Error('User with this email already exists.');
      }
      // Check if user with the same email already exists
      const existingUser2 = await User.findOne({ username: input.username });
      if (existingUser2) {
        throw new Error('User with this username already exists.');
      }

      // Hash the password
      const hashedPassword = bcrypt.hashSync(input.password, 10);

      // Create new user
      const newUser = new User({
        id: uuidv4(),
        username: input.username,
        email: input.email,
        password: hashedPassword,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        gender: input.gender,
        dob: new Date(input.dob),
        role: input.role,
        address: input.address,
      });

      try {
        console.log('Attempting to save new user:', newUser);
        await newUser.save();
        return newUser;
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error(`Error creating user: ${error.message}`);
      }
    },
    registerProduct: async (_, { input }) => {
      console.log(input);

      // Validate input fields
      if (!input.category || !input.subCategory || !input.name || !input.brand || !input.stock || !input.size || !input.price || !input.salePrice) {
        throw new Error('All fields except description are required.');
      }

      // Create new product
      const newProduct = new Product({
        id: uuidv4(),
        category: input.category,
        subCategory: input.subCategory,
        name: input.name,
        brand: input.brand,
        stock: input.stock,
        size: input.size,
        price: input.price,
        salePrice: input.salePrice,
        description: input.description,
      });

      try {
        console.log('Attempting to save new product:', newProduct);
        await newProduct.save();
        return newProduct;
      } catch (error) {
        console.error('Error creating product:', error);
        throw new Error(`Error creating product: ${error.message}`);
      }
    },
    removeProduct: async (_, { id }) => {
      const product = await Product.find({ id });
      const removedProduct = await Product.findOneAndDelete({ id });
      return "Product '"+removedProduct.name+"' Deleted Successfully";
    },
    removeUser: async (_, { id }) => {
      const user = await User.find({ id });
      const removedUser = await User.findOneAndDelete({ id });
      return "User '"+removedUser.username+"' Deleted Successfully";
    },
    deactivateUser: async (_, { id }) => {
      const user = await User.find({ id });
      const updatedUser = await User.findOneAndUpdate(
        { id }, 
        { $set: { isActive: false } }, 
        { new: true }
      );
      return "User '"+updatedUser.username+"' Deactivated Successfully";
    },
    
    
  },
};

// Export resolvers
export default resolvers;
