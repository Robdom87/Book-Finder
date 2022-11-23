const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String  
    savedBooks: [Book]!
  }

  type Book {
    _id: ID
    authors: String
    description: String
    bookId: String
    image: String  
    link: String 
    title: String 
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(userId: ID!, savedBook: String!): User
    removeBook(userId: ID!, savedBook: String!): User
  }
  }
`;

module.exports = typeDefs;
