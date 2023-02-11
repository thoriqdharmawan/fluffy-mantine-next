import { type FetchPolicy } from '@apollo/client';
import client from '../../apollo-client';

import { GET_LIST_PRODUCTS, GET_LIST_PRODUCT_VARIANTS, GET_PRODUCT_BY_ID } from './product.graphql';

interface ProductActionInterface {
  variables: Record<string, any>;
  fetchPolicy?: FetchPolicy;
}

const getListProducts = async (props: ProductActionInterface) => {
  const result = await client.query({
    query: GET_LIST_PRODUCTS,
    variables: props.variables,
    fetchPolicy: props.fetchPolicy,
  });

  return result;
};

const getProductById = async (props: ProductActionInterface) => {
  const result = await client.query({
    query: GET_PRODUCT_BY_ID,
    variables: props.variables,
    fetchPolicy: props.fetchPolicy,
  });

  return result;
};

const getListProductVariants = async (props: ProductActionInterface) => {
  const result = await client.query({
    query: GET_LIST_PRODUCT_VARIANTS,
    variables: props.variables,
    fetchPolicy: props.fetchPolicy,
  });

  return result;
};

export { getListProducts, getListProductVariants, getProductById };
