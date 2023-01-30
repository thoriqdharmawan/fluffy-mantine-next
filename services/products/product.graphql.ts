import { gql } from '@apollo/client';

// "90417dfc-06fc-47ca-92be-9603be775301"

export const GET_LIST_PRODUCTS = gql`
  query GetListProduct($company_id: uuid!, $search: String) {
    products(where: { company: { id: { _eq: $company_id } }, name: { _ilike: $search } }) {
      id
      name
      image
      description
      type
      variants
      categories {
        id
        name
      }
      product_variants {
        id
        coord
        is_primary
        price
        sku
        status
        stock
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation MyMutation {
    insert_products(
      objects: {
        companyId: "90417dfc-06fc-47ca-92be-9603be775301"
        description: "Air kenasan higienis"
        name: "Air Putih"
        type: "NOVARIANT"
        categories: { data: { name: "Minuman", companyId: "90417dfc-06fc-47ca-92be-9603be775301" } }
      }
    ) {
      affected_rows
    }
  }
`;
