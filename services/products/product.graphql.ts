import { gql } from '@apollo/client';

export const GET_LIST_PRODUCTS = gql`
  query GetListProduct($company_id: uuid!, $search: String) {
    products(where: { company: { id: { _eq: $company_id } }, name: { _ilike: $search } }) {
      id
      name
      image
      description
      type
      categories {
        id
        name
      }
      product_variants(limit: 1) {
        id
        coord
        is_primary
        price
        sku
        status
        stock
        productId
      }
      variants {
        id
        values
        name
      }
      product_variants_aggregate {
        aggregate {
          sum {
            stock
          }
        }
      }
    }
  }
`;

export const GET_LIST_PRODUCT_VARIANTS = gql`
  query GetProductVariants($productId: uuid!) {
    variants(where: { productId: { _eq: $productId } }, order_by: { id: asc }) {
      id
      values
      name
    }
    product_variants(where: { productId: { _eq: $productId } }, order_by: { id: asc }) {
      id
      coord
      is_primary
      price
      sku
      status
      stock
      productId
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
    $variants: [variants_insert_input!]!
    $categories: [categories_insert_input!]!
    $product_variants: [product_variants_insert_input!]!
  ) {
    insert_products(
      objects: {
        name: $name
        image: $image
        companyId: $companyId
        description: $description
        type: $type
        categories: { data: $categories }
        variants: { data: $variants }
        product_variants: { data: $product_variants }
      }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const UPDATE_IMAGE_PRODUCT = gql`
  mutation InsertProduct($id: uuid!, $image: String!) {
    update_products(where: { id: { _eq: $id } }, _set: { image: $image }) {
      affected_rows
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories($company_id: uuid!) {
    categories(distinct_on: name, where: { companyId: { _eq: $company_id } }) {
      id
      name
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($product_id: uuid!) {
    delete_products(where: { id: { _eq: $product_id } }) {
      affected_rows
    }
  }
`;

export const UPDATE_STATUS_PRODUCT = gql`
  mutation UpdateStatusProduct($id: Int!, $status: String!) {
    update_product_variants(where: { id: { _eq: $id } }, _set: { status: $status }) {
      affected_rows
    }
  }
`;
