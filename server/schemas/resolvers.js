const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate('savedBooks').populate({
        path: 'savedBooks',
        populate: 'Book'
      });
    },
  },

  Mutation: {
    createUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
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

    saveBook: async (parent, { userId, savedBook }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { savedBooks: savedBook },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeBook: async (parent, { userId, savedBook }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: savedBook } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;