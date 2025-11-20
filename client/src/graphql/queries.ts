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

export const GET_STAFF_MEMBER_QUERY = gql`
  query GetStaffMember($id: String!) {
    staffMember(id: $id) {
      id
      fullName
      email
      roomNumber
      specialty
      dateOfBirth
      createdAt
    }
  }
`;