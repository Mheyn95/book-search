const { User, Book } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({
          $or: [
            { _id: user ? user._id : context.user.id },
            { username: context.user.username },
          ],
        }).select("-__v -password");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    // get all users
    users: async () => {
      return User.find().select("-__v -password").populate("savedBooks");
    },
    // get a user by username or Id
    user: async (parent, { username }) => {
      return User.findOne({
        $or: [
          { _id: user ? user._id : context.user.id },
          { username: context.user.username },
        ],
      })
        .select("-__v -password")
        .populate("savedBooks");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email: email });

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const book = {
          ...args,
        };

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: book } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeBook: async (parent, args, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        return "Couldn't find user with this id!";
      }
      return updatedUser;
    },
  },
};

module.exports = resolvers;
