import { gql } from "apollo-server";
const typeDefs = gql`
  type Query {
    greet: String
    users: [User]
    user(_id:ID):[User]
    comment(by:ID):[Comment]
    comments: [CommentWithName]
  }

  type User {
    _id: ID
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
    signup(userNew: UserInput):User
    signin(userCred: UserCred):Token
    addcomment(userComment: String):Comment
  }

  type Token{
    token:String
  }

  input UserInput{
    firstName:String,
    lastName:String,
    email:String,
    password:String
  }

  input UserCred{
    email:String,
    password:String
  }

  type CommentWithName {
    comment:String
    by:IdName
  }

  type IdName{
    _id: String
    firstName:String
  }
`;

export default typeDefs;