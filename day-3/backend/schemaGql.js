import { gql } from "apollo-server";
const typeDefs = gql`
  type Query {
    greet: String
    users: [User]
    user(_id:ID):[User]
    comment(by:ID):[Comment]
    comments: [CommentWithName]
    posts: [PostWithName]
    post(by:ID):[Post]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    comments:[Comment]
    posts:[Post]
  }

  type Comment {
    comment: String
    by: String
  }

  type Post {
    by: String
    type: String
    details: String
  }

  type Mutation{
    signup(userNew: UserInput):User
    signin(userCred: UserCred):Token
    addcomment(userComment: String):Comment
    addpost(userPost: UserPost):Post
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
    by: IdName
    comment: String
  }
  
  type PostWithName {
    type: String
    details: String
    by:IdName
  }

  type IdName{
    _id: String
    firstName:String
  }

  input UserPost{
    type:String,
    details:String
  }
`;

export default typeDefs;