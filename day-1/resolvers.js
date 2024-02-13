import { comments, users } from "./fakerusers.js";
import { randomBytes } from "crypto";

const resolvers = {
    Query: {
      greet: () => "Welcome to GraphQL",
      user:(_,args) => users.filter(user=> user.id == args.id),
      comment:(_,args) => comments.filter(comment => comment.by == args.by),
      users: () => users,
      comments: () => comments,
    },
    User:{
      comments:(ur)=> comments.filter(comment=>comment.by == ur.id)
    },
    Mutation:{
        signup:(_,{firstName, lastName, email, password}) =>{
            const id = randomBytes(5).toString("hex")
            users.push({id,firstName,lastName,email,password})
            return users.find(user => user.id == id);
        }
    }
  };


export default resolvers;