import { comments, users } from "./fakerusers.js";

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
    }
  };


export default resolvers;