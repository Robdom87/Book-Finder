import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      savedBooks
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      savedBooks
    }
  }`;

  export const GET_ME = gql`
  query me {
    me {
      _id
      name
      skills
    }
  }
`;
