const { gql } = require('apollo-server-express');


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    mushorooms: [Mushroom]
    getUsers: [User]
    getConstributors: [User]
  }
  type Article {
    id: Int,
    name: String,
    text: String,
    image: String,
  }
  type UserPayload {
    id: String,
    email: String,
  }
  input File {
    filename: String!,
    mimetype: String!,
    encoding: String!,
    name: String,
    size: Int,
  }
  input CreatePost {
    title: String!,
    author: String!,
    content: String!,
  }
  type User {
    id: String,
    name: String,
    email: String!,
    profileImage: String,
  }
  type Mushroom {
    id: Int,
    name: String,
    type: Boolean,
    info: String,
  }
  type Mutation {
    createUser(email: String):User,
    deleteUser(id: Int):User,
    loginUser(email: String, password: String):UserPayload,
    refreshToken(token: String): String,
    createPost(input: CreatePost): String,
  }
`;

module.exports = typeDefs;