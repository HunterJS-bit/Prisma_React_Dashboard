const { gql } = require('apollo-server-express');


// Construct a schema, using GraphQL schema language
const typeDefs = gql`

  scalar JSON

  scalar Date

  type Query {
    hello: String
    mushorooms: [Mushroom]
    posts: [Post]
    users: [User]
    analytics: Analytics
    getConstributors: [User]
    getPosts(limit: Int, skip: Int): PostPagination
    getPost(id: String!): Post
    getUsers(limit: Int, skip: Int): UserPagination
    blog(limit: Int): [Post]
  }
  type UserPayload {
    id: String,
    email: String,
  }
  type PostPagination {
    posts: [Post],
    total: Int,
  }
  type UserPagination {
    users: [User],
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
    role: String,
    email: String!,
    profileImage: String,
    posts: Post
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
    isPublished: Boolean,
  }
  type Analytics {
     monthly: [MonthlyVisits],
     visitsByCountry: [VisitsByCountry]
  }
  type VisitsByCountry {
    country: String,
    data: Int,
  }
  type MonthlyVisits {
    date: String,
    count: Int,
  }
  type Mushroom {
    id: Int,
    name: String,
    type: Boolean,
    info: String,
  }
  input Comment {
     author: String!,
     comment: String!,
  }
  input UserCreate {
    name: String,
    role: String,
    email: String!,
    password: String!,
  }
  input UserEdit {
    name: String,
    role: String,
    email: String,
    password: String,
  }
  type Mutation {
    createUser(email: String):User,
    registerUser(input: UserCreate): User,
    editUser(id: Int, input: UserEdit): User,
    deleteUser(id: String!):User,
    loginUser(email: String, password: String):UserPayload,
    refreshToken(token: String): String,
    createPost(input: CreatePost): String,
    removePost(id: String): String,
    updatePost(id:String, input: CreatePost): Post
    postComment(input: Comment): String
  }
`;

module.exports = typeDefs;