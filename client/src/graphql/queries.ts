import { gql } from '@apollo/client';

export const GET_USER_BY_EMAIL = gql`
  query GetUser($email: String!) {
    user(email: $email) {
      id
      name
      dateOfBirth
    }
  }
`;