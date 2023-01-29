import { gql } from '@apollo/client';

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
