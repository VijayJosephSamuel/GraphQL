import mongoose, { mongo } from "mongoose";

console.log("hello from resolver")
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
        // signup:(_,{userNew}) =>{
        //     console.log('usernew', userNew)
        //     const id = randomBytes(5).toString("hex")
        //     users.push({id,...userNew})
        //     return users.find(user => user._id == id);
        // }
        signup: async(_, {userNew}) => {
            console.log('usernew', userNew)
            const newUser = new User({
                ...userNew
            })
            return await newUser.save();
        }
    }
  };

export default resolvers;