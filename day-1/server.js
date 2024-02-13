import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { comments, users } from "./fakerusers.js";

const typeDefs = gql`
  type Query {
    greet: String
    users: [User]
    comments: [Comment]
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Comment {
    comment: String
    by: String
  }
`;

const resolvers = {
  Query: {
    greet: () => "Welcome to GraphQL",
    users: () => users,
    comments: () => comments,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

server.listen().then(({ url }) => {
  console.log(`server is ready ${url}`);
});
