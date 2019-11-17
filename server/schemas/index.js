const { gql } = require('apollo-server-express');


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    mushorooms: [Mushroom]
    users: [User]
  }
  type Article {
    id: Int,
    name: String,
    text: String
  }
  type User {
    id: Int,
    email: String,
    password: String,
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
  }
`;

module.exports = typeDefs;