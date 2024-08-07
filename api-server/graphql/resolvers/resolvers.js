// Import necessary libraries
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import bcrypt from 'bcryptjs';

import { Category } from "../../models/CategoryModel.js";
import { SubCategory } from "../../models/SubCategoryModel.js";
import { User } from "../../models/UserModel.js";
import { Product } from "../../models/ProductModel.js";
import { getMaxId } from "../../utils/utils.js";

// Define resolvers 
const resolvers = {
  Query: {
    getCategory: async () => {
      try {
        const category = await Category.find({});
        return category;
      } catch (error) {
        throw new Error('Error fetching Categories');
      }
    },
    getSubCategory: async () => {
      try {
        const subCategory = await SubCategory.find({}).populate('categoryId');
        console.log(subCategory);
        return subCategory;
      } catch (error) {
        throw new Error('Error fetching Sub Categories');
      }
    },
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
        const products = await Product.find({})
        .populate('category')
        .populate('subCategory')
        .exec();
        return products;
      } catch (error) {
        throw new Error('Error fetching products');
      }
    },
    getOneProduct: async (_, { id }) => {
      const product = await Product.find({ id });
      return product[0];
    },
    loginAuth: async (_, { input }) => {
      try {
        const user = await User.find({username:input.username});
        if (user){
          const match = await bcrypt.compare(input.password, user[0].password);
          if (match) {
            return user[0];
          } else {
            return  null;
          }
        }else{
          console.log("User-Not-Found");
          return "user-not-found";
        }
      } catch (error) {
        console.log("error",error);
        throw new Error('Error fetching products');
      }
    }
  },
  Mutation: {
    registerCategory: async (_, { input }) => {
      console.log(input);

      // Validate input fields
      if (!input.name ) {
        throw new Error('Category Name can not be empty.');
      }

      const existingCategory = await Category.findOne({ name: input.name });
      if (existingCategory) {
        throw new Error('Category with this name already exists.');
      }
      var new_id=await getMaxId(Category)+1;
      console.log(new_id)
      // Create new Category
      const newCategory = new Category({
        id: new_id,
        name: input.name,
      });

      try {
        console.log('Attempting to save new Category:', newCategory);
        await newCategory.save();
        return newCategory;
      } catch (error) {
        console.error('Error creating Category:', error);
        throw new Error(`Error creating Category: ${error.message}`);
      }
    },
    registerSubCategory: async (_, { input }) => {
      console.log(input);

      // Validate input fields
      if (!input.name ) {
        throw new Error('Sub-Category Name can not be empty.');
      }
      if (!input.categoryId ) {
        throw new Error('Must have a category.');
      }
      
      const CategoryObj = await Category.findOne({ id: input.categoryId });
      console.log(CategoryObj);
      const existingSubCategory = await SubCategory.findOne({ name: input.name,
        categoryId:CategoryObj._id });

      if (existingSubCategory) {
        throw new Error('Sub Category already exists.');
      }
      var new_id= await getMaxId(SubCategory)+1;
      console.log(new_id)
      // Create new Category
      const newSubCategory = new SubCategory({
        id: new_id,
        name: input.name,
        categoryId:CategoryObj._id,
      });

      try {
        // console.log('Attempting to save new Sub-Category:', newSubCategory);
        await newSubCategory.save();
        return await newSubCategory.populate('categoryId');

      } catch (error) {
        console.error('Error creating Sub-Category:', error);
        throw new Error(`Error creating Sub-Category: ${error.message}`);
      }
    },
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
      // let hashedPassword 
      // bcrypt.hash(input.password, 10, (error, hash) => {
      //   hashedPassword = hash;
      // });
      // const hashedPassword = bcrypt.hash(input.password, 10);

      // Create new user
      const newUser = new User({
        id: uuidv4(),
        username: input.username,
        email: input.email,
        password: input.password,
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
      if (!input.category || !input.subCategory || !input.name || !input.brand || !input.stock || !input.size || !input.price || !input.image) {
        throw new Error('All fields except description are required.');
      }

      const CategoryObj = await Category.findOne({ id: input.category });
      const SubCategoryObj = await SubCategory.findOne({ id: input.subCategory });
      var new_id= await getMaxId(Product)+1;
      // console.log(new_id)
      // Create new product
      const newProduct = new Product({
        id: new_id,
        category: CategoryObj._id,
        subCategory: SubCategoryObj._id,
        name: input.name,
        brand: input.brand,
        stock: input.stock,
        size: input.size,
        price: input.price,
        description: input.description,
        image: input.image,
      });

      try {
        console.log('Attempting to save new product:', newProduct);
        await newProduct.save();
        return  await Product.findById(newProduct._id)
        .populate('category')
        .populate('subCategory')
        .exec();
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
    EditProductInput: async (_, { id, product }) => {
      const EditProductInput = await Product.findOneAndUpdate({ id }, product);
      return "Data Updated Successfully";
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
