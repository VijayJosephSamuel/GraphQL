import { gql } from "@apollo/client";
export const SIGNUP_USER = gql`
  mutation createUser($userNew: UserInput) {
    signup(userNew: $userNew) {
      _id
      firstName
      lastName
    }
  }
`;

export const LOGIN_USER = gql`
  mutation signin($userCred: UserCred) {
    signin(userCred: $userCred) {
      token
    }
  }
`;
