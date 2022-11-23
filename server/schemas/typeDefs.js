const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String  
    savedBooks: [String]!
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

  type Query {
    users: [User]!
    User(userId: ID!): User
  }

  type Mutation {
    addProfile(name: String!): Profile
    addSkill(profileId: ID!, skill: String!): Profile
    removeProfile(profileId: ID!): Profile
    removeSkill(profileId: ID!, skill: String!): Profile
  }
`;

module.exports = typeDefs;
