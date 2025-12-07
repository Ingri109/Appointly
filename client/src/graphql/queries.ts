import { gql } from '@apollo/client';

// User queries
export const GET_USER_BY_EMAIL = gql`
  query GetUser($email: String!) {
    user(email: $email) {
      id
      name
      email
      dateOfBirth
      bloodType
      phone
    }
  }
`;

export const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers {
    users {
      id
      name
      email
      dateOfBirth
    }
  }
`;

// Staff/Worker queries
export const GET_STAFF_MEMBER_QUERY = gql`
  query GetStaffMember($id: String!) {
    staffMember(id: $id) {
      id
      fullName
      email
      roomNumber
      specialty
      dateOfBirth
      
    }
  }
`;

export const GET_ALL_STAFF_QUERY = gql`
  query GetAllStaff {
    allStaff {
      id
      fullName
      email
      roomNumber
      specialty
      dateOfBirth
    }
  }
`;

// Alias for workers (staff are workers in this system)
export const GET_ALL_WORKERS_QUERY = GET_ALL_STAFF_QUERY;
export const GET_WORKER_BY_ID_QUERY = GET_STAFF_MEMBER_QUERY;