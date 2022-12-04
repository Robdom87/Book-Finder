const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // users: async () => {
    //   return User.find();
    // },

    // user: async (parent, { userId }) => {
    //   return User.findOne({ _id: userId }).populate('savedBooks').populate({
    //     path: 'savedBooks',
    //     populate: 'Book'
    //   });
    // },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select('-__v -password');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { newBook }, context) => {
      if(context.user){
        const updatedUser = await User.findByIDAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: newBook }},
        {
          new: true,
          runValidators: true,
        }   
        )
        return updatedUser;
      }        
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, context) => {
      if(context.user){
        const updatedUser = await User.findByIDAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks:  {bookId}}},
        {
          new: true,
          runValidators: true,
        }   
        )
        return updatedUser;
      }        
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;