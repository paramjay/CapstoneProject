// Import necessary libraries
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import bcrypt from 'bcryptjs';

// Initialize empty users array
let users = [];

// Define resolvers
const resolvers = {
  Query: {
    getUsers: () => users,
  },
  Mutation: {
    registerUser: (_, { username, email, password, firstName, lastName, phone, gender, dob, role, address }) => {
      // Validate input fields
      if (!username || !email || !password || !firstName || !lastName || !phone || !gender || !dob || !role) {
        throw new Error("All fields are required.");
      }

      // Validate email format
      if (!validator.isEmail(email)) {
        throw new Error("Invalid email format.");
      }

      // Validate phone number format
      if (!validator.isMobilePhone(phone, 'any', { strictMode: false })) {
        throw new Error("Invalid phone number format.");
      }

      // Check if user with the same email already exists
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        throw new Error("User with this email already exists.");
      }

      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Create new user
      const newUser = {
        id: uuidv4(),
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        gender,
        dob,
        role,
        address,
      };

      // Push new user to the users array
      users.push(newUser);
      
      // Return the newly created user
      return newUser;
    },
  },
};

// Export resolvers
export default resolvers;
