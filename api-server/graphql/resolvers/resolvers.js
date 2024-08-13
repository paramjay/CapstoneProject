// Import necessary libraries
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import mongoose from "mongoose";
import { Category } from "../../models/CategoryModel.js";
import { SubCategory } from "../../models/SubCategoryModel.js";
import { User } from "../../models/UserModel.js";
import { Product } from "../../models/ProductModel.js";
import { Wishlist } from "../../models/WishList.js";
import { getMaxId } from "../../utils/utils.js";
import { Checkout } from '../../models/CheckoutModel.js';
import { Cart } from '../../models/CartModel.js';
import { CatDiscount } from '../../models/CatDiscount.js';

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
    },
    getSubCategoryByCategoryId: async (_, { input }) => {
      try {
        const category = await Category.find({id:parseInt(input)});
        const subCategory = await SubCategory.find({categoryId:category});
        console.log(subCategory);
        return subCategory;
      } catch (error) {
        throw new Error('Error fetching Sub Categories');
      }
    },
    getFilteredProducts: async (_, props) => {
      console.log(props);
      const query = {};

      if (props.price && props.price>0) {
        query.price = {};
        query.price.$gte = 1;
        query.price.$lte = parseFloat(props.price);
      }
      if (props.category) {
        const category = await Category.findOne({id:parseInt(props.category)});
        query.category = category._id;
      }
  
      if (props.subCategory) {
        const subCategory = await SubCategory.findOne({id:parseInt(props.subCategory)});
        query.subCategory = subCategory._id;
      }
      if (props.gender) {
        query.gender = props.gender;
      }

      console.log(query)
      const products = await Product.find(query).populate('category');
      return products;
    },
    getWishlistByUserId: async (_, { input }) => {
      try {
        const user = await User.find({id:input});
        const wishlist = await Wishlist.find({user}).populate({
          path: 'product',
          populate: {
            path: 'category',
            model: 'Category'
          }
        }).exec();
        console.log(wishlist);
        return wishlist;
      } catch (error) {
        console.error(error)
        throw new Error('Error fetching Wishlist');
      }
    },
    getCatDiscount: async () => {
      try {
        const catDiscount = await CatDiscount.find({}).populate('category');
        return catDiscount;
      } catch (error) {
        throw new Error('Error fetching Categories');
      }
    },
    getAllBills: async () => {
      try {
        const checkouts = await Checkout.find({}).populate('user');
        return checkouts;
      } catch (error) {
        throw new Error('Error fetching Categories');
      }
    },
    
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

      var new_id=await getMaxId(User)+1;
      console.log(new_id)
      // Create new user
      const newUser = new User({
        id: new_id,
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
      if (!input.category || !input.subCategory || !input.name || !input.brand || !input.stock || !input.size || !input.price || !input.image || !input.gender) {
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
        gender:input.gender,
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
    addToWishlist: async (_, { userId, productId }) => {
      console.log(userId,productId)
      const user = await User.findOne({ id:userId });
      const product = await Product.findOne({ id:productId });
      console.log(user,product)
      const existingWishlist = await Wishlist.findOne({ user:user,product:product });
      if(!existingWishlist){
        var new_id=await getMaxId(Wishlist)+1;
        const newWishlist = new Wishlist({
          id: new_id,
          user: user._id,
          product:product._id
        });
        try {
          console.log('Attempting to save new Wishlist:', newWishlist);
          await newWishlist.save();
          return "Product added to wishlist successfully!";
        } catch (error) {
          console.error('Error adding Wishlist:', error);
          throw new Error(`Error adding Wishlist: ${error.message}`);
        }
      }
      else{
        return "Already in Wishlist.";
      }
    },
    removeWishlist: async (_, { id }) => {
      try {
        const removedWishlist = await Wishlist.findOneAndDelete({ id });
        return "Product removed from wishlist Successfully"; 
      } catch (error) {
        console.error('Error removing product from Wishlist:', error);
        throw new Error(`Error removing product from Wishlist: ${error.message}`);
      }
    },

    addCheckout: async (_, { input }) => {
      // console.log(input);

      // Validate input fields
      if (!input.user || !input.address || !input.country ||
         !input.state || !input.zip || !input.paymentMethod || !input.ccName ||
          !input.ccNumber || !input.ccExpiration || !input.ccCvv 
          || !input.total || !input.cart.length<0) {
        throw new Error('All fields are required.');
      }

      // Check if user with the same email already exists
      const existingUser = await User.findOne({ id: parseInt(input.user) });
      
      var new_id=await getMaxId(Checkout)+1;
      
      // Create new Checkout
      let newCheckout = new Checkout({
        id: new_id,
        user: existingUser._id,
        address: input.address,
        country: input.country,
        state: input.state,
        zip: input.zip,
        paymentMethod: input.paymentMethod,
        ccName: input.ccName,
        ccNumber: input.ccNumber,
        ccExpiration: input.ccExpiration,
        ccCvv: input.ccCvv,
        total:input.total,
        promoCode:input.promoCode,
        promoDiscount:input.promoDiscount,
        categoryDiscount:input.categoryDiscount
      });

      try {
        // console.log('Attempting to save new checkout:', newCheckout);
        newCheckout=await newCheckout.save();
        var new_id2=await getMaxId(Cart);
        input.cart.forEach(async item => {
          new_id2++
          // console.log(new_id2);
          let newCart = new Cart({
            id: new_id2,
            product: await User.findOne({ id: parseInt(item.id) }),
            checkout: newCheckout._id,
            productName: item.name,
            price: item.price,
            total: item.price*item.quantity,
            quantity: item.quantity,
            size: item.size,
          });
          await newCart.save();
        });
        
      } catch (error) {
        console.error('Error creating new Checkout:', error);
        throw new Error(`Error creating new Checkout: ${error.message}`);
      }
      return "Thank you for your purchase & stay tuned for upcoming Fashion Sales!";
      
    },
    addCatDiscount: async (_, { input }) => {
      // console.log(input);

      // Validate input fields
      if (!input.discount || !input.category ) {
        throw new Error('All fields are required.');
      }

      // Check if user with the same email already exists
      const category = await Category.findOne({ id: parseInt(input.category) });
      await CatDiscount.deleteMany();
      // var new_id=await getMaxId(CatDiscount)+1;
      
      // Create new Checkout
      let newCatDiscount = new CatDiscount({
        id: 1,
        discount:input.discount,
        category:category,
      });

      try {
        // console.log('Attempting to save new Discount:', newCatDiscount);
        newCatDiscount=await newCatDiscount.save();
        return "Category Discount added Successfully!";
      } catch (error) {
        console.error('Error creating new Checkout:', error);
        throw new Error(`Error creating new Checkout: ${error.message}`);
      }
      
    }
  },
};

// Export resolvers
export default resolvers;
