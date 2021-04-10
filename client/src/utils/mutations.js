import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    bookAuthor: [String]
    description: String!
    title: String!
    bookId: String!
    image: String!
    link: String!
    ) {
    saveBook(
        bookAuthor: $bookAuthor
        description: $description
        title: $title
        bookId: $bookId
        image: $image
        link: $link
        ) {
            user {
                _id
                username
              }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook(bookId: String!) {
    removeBook(bookId: $bookId) {
        user {
            _id
            username
        }
    }
  }
`;
