import { gql } from "apollo-server";
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

  type Mutation{
    signup(
        firstName:String,
        lastName:String,
        email:String,
        password:String
    ):User
  }
`;

export default typeDefs;