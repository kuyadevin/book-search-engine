import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me{
    User {
      _id: ID!
      username: String!
      email: String!
      bookCount: Int
      savedBooks: [Book]
    }
  }
`