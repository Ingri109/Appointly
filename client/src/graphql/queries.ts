import { gql } from '@apollo/client';

// User queries
export const GET_USER_BY_ID = gql`
  query GetUser($id: String!) {
    user(id: $id) {
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
      specialty
      dateOfBirth
      url
      assessment
      location
      description
    }
  }
`;

export const GET_ALL_STAFF_QUERY = gql`
  query GetAllStaff {
    allStaff {
      id
      fullName
      email
      specialty
      dateOfBirth
      url
      assessment
      location
    }
  }
`;

export const GET_BOOKED_SLOTS_QUERY = gql`
  query GetBookedSlots($staffId: String!, $date: String!) {
    getBookedSlots(staffId: $staffId, date: $date)
  }
`;

export const GET_MY_APPOINTMENTS_QUERY = gql`
  query MyAppointments {
    myAppointments {
      id
      date
      time
      status
      staff {
        id
        fullName
        specialty
        location
      }
    }
  }
`;

export const GET_ALL_WORKERS_QUERY = GET_ALL_STAFF_QUERY;
export const GET_WORKER_BY_ID_QUERY = GET_STAFF_MEMBER_QUERY;