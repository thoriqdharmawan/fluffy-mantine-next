import { gql } from '@apollo/client';

export const GET_INCOMES = gql`
  query GetTransactions(
    $startdate: timestamptz = ""
    $enddate: timestamptz = ""
    $companyId: uuid = ""
  ) {
    transactions_aggregate(
      where: { created_at: { _gte: $startdate, _lt: $enddate }, companyId: { _eq: $companyId } }
    ) {
      aggregate {
        count
        sum {
          total_amount
        }
      }
    }
  }
`

export const GET_LIST_TRANSACTIONS = gql`
  query GetListTransactions($where: transactions_bool_exp!, $limit: Int, $offset: Int) {
    total: transactions_aggregate(where: $where) {
      aggregate {
        count
      }
    }

    transactions(where: $where, limit: $limit, offset: $offset, order_by: { created_at: desc }) {
      id
      code
      total_amount
      created_at
    }
  }
`;
