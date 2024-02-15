import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

const User = mongoose.model("User");
const Quote = mongoose.model("Quote");
const Post = mongoose.model("Post");

const resolvers = {
  Query: {
    greet: () => "Welcome to GraphQL",
    user: async (_, args) => await User.find({ _id: args._id }),
    comment: async (_, args) => await Quote.find({ by: args.by }),
    users: async () => await User.find({}),
    comments: async () => {
      const comments = await Quote.find().populate("by","_id firstName");
      console.log("comments", comments);
      return comments;
    },
    post: async (_, args) => await Post.find({ by: args.by }),
    posts: async () => {
      const posts = await Post.find().populate("by","_id firstName");
      console.log("posts", posts);
      return posts;
    },
  },
  User: {
    comments: async (ur) => await Quote.find({ by: ur._id }),
    posts: async (ur) => await Post.find({ by: ur._id }),
  },
  Mutation: {
    signup: async (_, { userNew }) => {
      console.log("usernew", userNew);
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exists");
      }

      const hp = await bcrypt.hash(userNew.password, 12);
      const newUser = new User({
        ...userNew,
        password: hp,
      });
      return await newUser.save();
    },

    signin: async (_, { userCred }) => {
      console.log("userCred", userCred);
      const user = await User.findOne({ email: userCred.email });
      if (!user) {
        throw new Error("User does not exist.");
      }

      const isValidUser = await bcrypt.compare(
        userCred.password,
        user.password
      );
      console.log("isvalid", isValidUser);
      if (!isValidUser) {
        throw new Error("Invalid Credentials");
      }

      const token = JWT.sign({ userId: user._id }, JWT_SECRET);
      return { token };
    },

    addcomment: async (_, { userComment }, { userId }) => {
      console.log("userComment", userComment);
      console.log("userId", userId);

      if (!userId) throw new Error("User is not logged in");

      const newComment = new Quote({
        comment: userComment,
        by: userId,
      });
      return await newComment.save();
    },

    addpost: async (_, { userPost }, { userId }) => {
      console.log("userPost", userPost);
      console.log("userId", userId);

      if (!userId) throw new Error("User is not logged in");

      const newPost = new Post({
        details: userPost.details,
        type: userPost.type,
        by: userId,
      });
      return await newPost.save();
    },
  },
};

export default resolvers;
