const { gql } = require('apollo-server-express');


// Construct a schema, using GraphQL schema language
const typeDefs = gql`

  scalar JSON

  type Query {
    hello: String
    mushorooms: [Mushroom]
    getUsers: [User]
    getConstributors: [User]
    getPosts(limit: Int, skip: Int): PostPagination
    getPost(id: String): Post
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
  type PostPagination {
    posts: [PostAdmin],
    total: Int,
  }
  input CreatePost {
    title: String!,
    author: String!,
    content: JSON,
    excerpt: String,
    image: Upload,
    isPublished: Boolean,
  }
  type User {
    id: String,
    name: String,
    email: String!,
    profileImage: String,
  }
  type PostAdmin {
    id: String,
    title: String,
    content: JSON,
    excerpt: String,
    author: User,
    imgSrc: String,
    isPublished: Boolean,
  }
  type Post {
    id: String,
    title: String,
    content: JSON,
    excerpt: String,
    author: User,
    imgSrc: String,
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
    removePost(id: String): String,
    updatePost(id:String, input: CreatePost): Post
  }
`;

module.exports = typeDefs;