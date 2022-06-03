const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('You must be logged in!');
    },
  },
  Mutation: {
    addUser: async (paremt, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user with this email address.')
      }
      const isCorrectPassword = await user.isCorrectPassword(password);
      if (!isCorrectPassword) {
        throw new AuthenticationError('Incorrect password');
      }

      const token = signToken(user);
      return { token, user };
    }
  }
}