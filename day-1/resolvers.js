import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

const User = mongoose.model("User")
const Quote = mongoose.model("Quote")

const resolvers = {
    Query: {
      greet: () => "Welcome to GraphQL",
      user: async (_,args) => await User.find({_id: args._id}),
      comment: async (_,args) =>await Quote.find({by: args.by}),
      users:async  () => await User.find({}),
      comments:async () =>  await Quote.find({}),
    },
    User:{
      comments:async(ur)=> await Quote.find({by:ur._id})
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
        },
    
        signin: async(_, {userCred}) => {
            console.log('userCred', userCred)
            const user = await User.findOne({email:userCred.email})
            if(!user){
                throw new Error("User does not exist.");
            }

            const isValidUser = await bcrypt.compare(userCred.password, user.password)
            console.log('isvalid', isValidUser)
            if(!isValidUser){
                throw new Error("Invalid Credentials");
            }

            const token = JWT.sign({userId: user._id}, JWT_SECRET)
            return {token};
            
        },

        addcomment: async(_, {userComment}, {userId}) =>{
            console.log('userComment', userComment)
            console.log('userId', userId)

            if(!userId) throw new Error('User is not logged in')

            const newComment = new Quote({
                comment: userComment,
                by: userId
            })
            return await newComment.save();
        },
    }
  };

export default resolvers;