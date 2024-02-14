import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";

const User = mongoose.model("User")
const Quote = mongoose.model("Quote")

const resolvers = {
    Query: {
      greet: () => "Welcome to GraphQL",
      user:(_,args) => users.filter(user=> user._id == args._id),
      comment:(_,args) => comments.filter(comment => comment.by == args.by),
      users: () => users,
      comments: () => comments,
    },
    User:{
      comments:(ur)=> comments.filter(comment=>comment.by == ur._id)
    },
    Mutation:{
        signup: async(_, {userNew}) => {
            console.log('usernew', userNew)
            const user = await User.findOne({email:userNew.email})
            if(user){
                throw new Error("User already exists");
            }

            const hp = await bcrypt.hash(userNew.password, 12)
            const newUser = new User({
                ...userNew,
                password:hp
            })
            return await newUser.save();
        }
    }
  };

export default resolvers;