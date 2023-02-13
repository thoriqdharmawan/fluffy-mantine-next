import { gql } from '@apollo/client';

export const GET_LIST_EMPLOYEES = gql`
  query GetEmployees($companyId: uuid!, $search: String) {
    total: employees_aggregate(
      where: {
        companyId: { _eq: $companyId }
        _or: { name: { _ilike: $search }, username: { _ilike: $search } }
      }
    ) {
      aggregate {
        count
      }
    }
    employees(
      where: {
        companyId: { _eq: $companyId }
        _or: { name: { _ilike: $search }, username: { _ilike: $search } }
      }
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
