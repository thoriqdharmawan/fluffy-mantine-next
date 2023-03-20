import { gql } from '@apollo/client';

export const GET_LIST_EMPLOYEES = gql`
  query GetEmployees($where: employees_bool_exp!, $limit: Int, $offset: Int) {
    total: employees_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    employees(
      where: $where
      limit: $limit
      offset: $offset
      order_by: { created_at: desc }
    ) {
      id
      name
      image
      status
      username
      address
      email
      position {
        id
        name
      }
    }
  }
`;

export const UPDATE_EMPLOYEE_STATUS = gql`
  mutation UpdateEmployeeStatus($employeeId: uuid!, $status: String!) {
    update_employees(where: { id: { _eq: $employeeId } }, _set: { status: $status }) {
      affected_rows
    }
  }
`;
