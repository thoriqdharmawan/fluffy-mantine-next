import { gql } from '@apollo/client';

export const GET_LIST_PRODUCTS = gql`
  query GetListProduct($where: products_bool_exp!, $limit: Int, $offset: Int) {
    total: products_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    total_active: products_aggregate(where: {status: {_eq: "ACTIVE"}}) {
      aggregate {
        count
      }
    }
    
    total_opname: products_aggregate(where: {status: {_eq: "OPNAME"}}) {
      aggregate {
        count
      }
    }

    total_waiting: products_aggregate(where: {status: {_eq: "WAITING_FOR_APPROVAL"}}) {
      aggregate {
        count
      }
    }

    products(where: $where, limit: $limit, offset: $offset, order_by: { name: asc }) {
      id
      name
      image
      description
    }
  }
`;
// export const GET_LIST_PRODUCTS = gql`
//   query GetListProduct($where: products_bool_exp!, $limit: Int, $offset: Int) {
//     total: products_aggregate(where: $where) {
//       aggregate {
//         count
//       }
//     }
//     products(
//       where: $where
//       limit: $limit
//       offset: $offset
//       order_by: { name: asc }
//     ) {
//       id
//       name
//       image
//       type
//       status
//       product_variants(limit: 1) {
//         id
//         coord
//         is_primary
//         price
//         price_wholesale
//         sku
//         stock
//       }
//       variants {
//         id
//         values
//         name
//       }
//       product_variants_aggregate {
//         aggregate {
//           sum {
//             stock
//           }
//         }
//       }
//     }
//   }
// `;

export const GET_DETAIL_PRODUCT = gql`
  query GetDetailProduct($product_id: uuid!) {
    products(where: { id: { _eq: $product_id } }) {
      id
      name
      image
      status
      description
      variants(order_by: { id: asc }) {
        id
        values
        name
      }
      product_variants(order_by: { id: asc }) {
        id
        coord
        is_primary
        price
        price_wholesale
        min_wholesale
        scale
        sku
        status
        stock
        productId
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($product_id: uuid!) {
    products(where: { id: { _eq: $product_id } }) {
      id
      name
      image
      description
      type
      categories {
        id
        name
      }
      product_variants {
        id
        coord
        is_primary
        price
        price_purchase
        price_wholesale
        min_wholesale
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
    }
  }
`;

export const GET_PRODUCT_PRICES_BY_ID = gql`
  query GetProductPricesById($product_id: uuid!) {
    products(where: { id: { _eq: $product_id } }) {
      id
      name
      image
      type
      product_variants {
        id
        coord
        is_primary
        price
        price_purchase
        price_wholesale
        min_wholesale
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
    }
  }
`;
export const GET_PRODUCT_VARIANT_PRICES_BY_ID = gql`
  query GetProductVariantPricesById($variant_id: Int!) {
    product_variants(where: { id: { _eq: $variant_id } }) {
      id
      price
      price_wholesale
      min_wholesale
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
      price_wholesale
      min_wholesale
      scale
      sku
      status
      stock
      productId
    }
  }
`;

export const GET_LIST_PRODUCT_VARIANTS_STOCK = gql`
  query GetProductVariants($productId: uuid!) {
    variants(where: { productId: { _eq: $productId } }, order_by: { id: asc }) {
      id
      values
      name
    }
    product_variants(where: { productId: { _eq: $productId } }, order_by: { id: asc }) {
      id
      coord
      scale
      stock
    }
  }
`;

export const SET_TRANSFER_STOCK = gql`
  mutation TransferStock($id_from: Int!, $id_to: Int!, $stock_from: Int!, $stock_to: Int!) {
    q1: update_product_variants(where: { id: { _eq: $id_from } }, _inc: { stock: $stock_from }) {
      affected_rows
    }

    q2: update_product_variants(where: { id: { _eq: $id_to } }, _inc: { stock: $stock_to }) {
      affected_rows
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
    $status: String
    $variants: [variants_insert_input!]!
    # $categories: [categories_insert_input!]!
    $product_variants: [product_variants_insert_input!]!
  ) {
    insert_products(
      objects: {
        name: $name
        image: $image
        companyId: $companyId
        description: $description
        type: $type
        status: $status
        # categories: { data: $categories }
        variants: { data: $variants }
        product_variants: { data: $product_variants }
      }
    ) {
      affected_rows
      returning {
        id
        status
      }
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation UpdateProduct(
    $id: uuid!
    $name: String
    $image: String
    $description: String
    $type: String
    # $categories: [categories_insert_input]
    $variants: [variants_insert_input!]!
    $product_variants: [product_variants_insert_input!]!
  ) {
    # delete_categories(where: { productId: { _eq: $id } }) {
    #   affected_rows
    # }

    delete_variants(where: { productId: { _eq: $id } }) {
      affected_rows
    }

    delete_product_variants(where: { productId: { _eq: $id } }) {
      affected_rows
    }

    update_products(
      where: { id: { _eq: $id } }
      _set: { name: $name, image: $image, description: $description, type: $type }
    ) {
      affected_rows
      returning {
        id
      }
    }

    # insert_categories(
    #   objects: $categories
    #   on_conflict: { constraint: categories_pkey, update_columns: [name] }
    # ) {
    #   affected_rows
    # }

    insert_variants(
      objects: $variants
      on_conflict: { constraint: variants_pkey, update_columns: [name, values] }
    ) {
      affected_rows
    }

    insert_product_variants(
      objects: $product_variants
      on_conflict: {
        constraint: product_variants_pkey
        update_columns: [
          coord
          is_primary
          price
          price_purchase
          price_wholesale
          min_wholesale
          sku
          status
          stock
        ]
      }
    ) {
      affected_rows
    }
  }
`;

export const EDIT_PRODUCT_PRICES = gql`
  mutation UpdateProductPrices($id: uuid!, $product_variants: [product_variants_insert_input!]!) {
    delete_product_variants(where: { productId: { _eq: $id } }) {
      affected_rows
    }

    insert_product_variants(
      objects: $product_variants
      on_conflict: {
        constraint: product_variants_pkey
        update_columns: [price, price_wholesale, min_wholesale]
      }
    ) {
      affected_rows
    }
  }
`;
export const EDIT_PRODUCT_PRICE = gql`
  mutation UpdatePrice(
    $id: Int!
    $price: numeric!
    $price_wholesale: numeric!
    $min_wholesale: Int!
  ) {
    update_product_variants(
      where: { id: { _eq: $id } }
      _set: { price: $price, price_wholesale: $price_wholesale, min_wholesale: $min_wholesale }
    ) {
      affected_rows
    }
  }
`;

export const EDIT_PRODUCT_STOCK = gql`
  mutation UpdateStock($id: Int!, $stock: Int!) {
    update_product_variants(where: { id: { _eq: $id } }, _set: { stock: $stock }) {
      affected_rows
    }
  }
`;

export const EDIT_PRODUCT_SCALE = gql`
  mutation UpdateStock($id: Int!, $scale: Int!) {
    update_product_variants(where: { id: { _eq: $id } }, _set: { scale: $scale }) {
      affected_rows
    }
  }
`;

export const EDIT_SKU_STOCK = gql`
  mutation UpdateStock($id: Int!, $sku: String!) {
    update_product_variants(where: { id: { _eq: $id } }, _set: { sku: $sku }) {
      affected_rows
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

export const UPDATE_STATUS_PRODUCT_VARIANT = gql`
  mutation UpdateStatusProduct($id: Int!, $status: String!) {
    update_product_variants(where: { id: { _eq: $id } }, _set: { status: $status }) {
      affected_rows
    }
  }
`;

export const UPDATE_STATUS_PRODUCT = gql`
  mutation UpdateStock($id: uuid!, $status: String!) {
    update_products(where: { id: { _eq: $id } }, _set: { status: $status }) {
      affected_rows
    }
  }
`;
