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