const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int  
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String     
    image: String  
    link: String 
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    # users: [User]!
    # user(userId: ID!): User
  }

  input savedBook {
    bookId: String,
    authors: [String],
    description: String,
    title: String,     
    image: String,  
    link: String 
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(newBook: savedBook!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
