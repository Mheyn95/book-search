// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Book {
    _id: ID
    bookId: String
    authors: [String]
    description: String
    title: String
    image: Int
    link: [Reaction]
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      bookAuthor: [String]
      description: String!
      title: String!
      bookId: String!
      iamge: String!
      link: String!
    ): User
    removeBook(bookId: String!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;
