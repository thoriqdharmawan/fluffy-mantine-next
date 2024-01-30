import { gql } from '@apollo/client';

export const GET_LIST_COMPANIES_BY_USER = gql`
  query GetUsers($uid: String!) {
    companies(limit: 10, where: { userId: { _eq: $uid } }) {
      id
      name
    }
  }
`;
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
`;

export const GET_CHART_TRANSACTION = gql`
  query GetChartTransactions(
    $one_start: timestamptz = ""
    $one_end: timestamptz = ""
    $two_start: timestamptz = ""
    $two_end: timestamptz = ""
    $three_start: timestamptz = ""
    $three_end: timestamptz = ""
    $four_start: timestamptz = ""
    $four_end: timestamptz = ""
    $five_start: timestamptz = ""
    $five_end: timestamptz = ""
    $six_start: timestamptz = ""
    $six_end: timestamptz = ""
    $seven_start: timestamptz = ""
    $seven_end: timestamptz = ""
    $companyId: uuid = ""
  ) {
    one: transactions_aggregate(
      where: { created_at: { _gte: $one_start, _lt: $one_end }, companyId: { _eq: $companyId } }
    ) {
      aggregate {
        sum {
          total_amount
        }
      }
    }

    two: transactions_aggregate(
      where: { created_at: { _gte: $two_start, _lt: $two_end }, companyId: { _eq: $companyId } }
    ) {
      aggregate {
        sum {
          total_amount
        }
      }
    }

    three: transactions_aggregate(
      where: { created_at: { _gte: $three_start, _lt: $three_end }, companyId: { _eq: $companyId } }
    ) {
      aggregate {
        sum {
          total_amount
        }
      }
    }

    four: transactions_aggregate(
      where: { created_at: { _gte: $four_start, _lt: $four_end }, companyId: { _eq: $companyId } }
    ) {
      aggregate {
        sum {
          total_amount
        }
      }
    }

    five: transactions_aggregate(
      where: { created_at: { _gte: $five_start, _lt: $five_end }, companyId: { _eq: $companyId } }
    ) {
      aggregate {
        sum {
          total_amount
        }
      }
    }

    six: transactions_aggregate(
      where: { created_at: { _gte: $six_start, _lt: $six_end }, companyId: { _eq: $companyId } }
    ) {
      aggregate {
        sum {
          total_amount
        }
      }
    }

    seven: transactions_aggregate(
      where: { created_at: { _gte: $seven_start, _lt: $seven_end }, companyId: { _eq: $companyId } }
    ) {
      aggregate {
        sum {
          total_amount
        }
      }
    }
  }
`;

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

export const GET_DETAIL_TRANSACTION = gql`
  query GetDetailTransactions($id: uuid!) {
    transactions(where: { id: { _eq: $id } }) {
      id
      code
      created_at
      total_amount
      payment_amount
      payment_method
      payment_type
      products_solds {
        id
        name
        quantity_sold
        total_price
        unit_price
      }
      employee {
        id
        name
      }
    }
  }
`;
