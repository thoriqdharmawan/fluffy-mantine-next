import { gql } from '@apollo/client';

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


// {
//   "name": "Nutrisari",
//   "image": "https://firebasestorage.googleapis.com/v0/b/fluffy-d91c4.appspot.com/o/A_small_cup_of_coffee.jpg?alt=media&token=7a03e4e8-a163-4f7a-9979-06546cb4d04d",
//   "companyId": "90417dfc-06fc-47ca-92be-9603be775301",
//   "description": "Nutrisari Dingin enak",
//   "type": "NOVARIANT",
//   "categories": [
//     {"name": "Makanan", "companyId": "90417dfc-06fc-47ca-92be-9603be775301"},
//     {"name":"Minuman", "companyId": "90417dfc-06fc-47ca-92be-9603be775301"}
//   ],
//   "product_variants": [
//     {
//       "coord": [0, 0],
//       "is_primary": true,
//       "price": 6000,
//       "sku": "NTRSRI",
//       "status": "ACTIVE",
//       "stock": 10
//     }
//   ]
// }

export const ADD_PRODUCT = gql`
  mutation InsertProduct(
    $name: String
    $image: String
    $companyId: uuid
    $description: String
    $type: String
    $categories: [categories_insert_input!]!
    $product_variants: [product_variants_insert_input!] = {}
  ) {
    insert_products(
      objects: {
        name: $name
        image: $image
        companyId: $companyId
        description: $description
        type: $type
        categories: { data: $categories }
        product_variants: { data: $product_variants }
      }
    ) {
      affected_rows
    }
  }
`;
