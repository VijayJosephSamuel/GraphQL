import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { comments, users } from "./fakerusers.js";

const typeDefs = gql`
  type Query {
    greet: String
    users: [User]
    user(id:ID):[User]
    comment(by:ID):[Comment]
    comments: [Comment]
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    comments:[Comment]
  }

  type Comment {
    comment: String
    by: String
  }
`;

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

server.listen().then(({ url }) => {
  console.log(`server is ready ${url}`);
});
