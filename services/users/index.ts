import { gql } from '@apollo/client';

export const GET_LIST_USER_LOGIN = gql`
  query GetuserLogin($uid: String!) {
    users(where: { id: { _eq: $uid } }) {
      id
      name
      companyId
    }
  }
`;
