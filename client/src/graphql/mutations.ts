import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      accessToken
      user {
        id
        email
        name
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      user {
        id
        email
        name
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout($userId: String!) {
    logout(userId: $userId)
  }
`;


export const REGISTER_STAFF_MUTATION = gql`
  mutation RegisterStaff($input: CreateStaffInput!) {
    registerStaff(createStaffInput: $input) {
      accessToken
      user {
        id
        fullName
        email
        roomNumber
        specialty
      }
    }
  }
`;

export const LOGIN_STAFF_MUTATION = gql`
  mutation LoginStaff($input: LoginStaffInput!) {
    loginStaff(loginStaffInput: $input) {
      accessToken
      user {
        id
        fullName
        email
        specialty
      }
    }
  }
`;

export const UPDATE_STAFF_MUTATION = gql`
  mutation UpdateStaff($input: UpdateStaffInput!) {
    updateStaff(updateStaffInput: $input) {
      id
      fullName
      roomNumber
      specialty
    }
  }
`;

export const REMOVE_STAFF_MUTATION = gql`
  mutation RemoveStaff($id: String!) {
    removeStaff(id: $id)
  }
`;

export const LOGOUT_STAFF_MUTATION = gql`
  mutation LogoutStaff($staffId: String!) {
    logoutStaff(staffId: $staffId)
  }
`;

// User mutations
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      name
      email
      dateOfBirth
    }
  }
`;

export const REMOVE_USER_MUTATION = gql`
  mutation RemoveUser($id: String!) {
    removeUser(id: $id)
  }
`;

export const CREATE_APPOINTMENT_MUTATION = gql`
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(createAppointmentInput: $input) {
      id
      date
      time
      status
    }
  }
`;