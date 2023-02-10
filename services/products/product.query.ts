import { type FetchPolicy } from '@apollo/client';
import client from '../../apollo-client';

import { GET_LIST_PRODUCTS, GET_LIST_PRODUCT_VARIANTS } from './product.graphql';

interface ProductActionInterface {
  variables: Record<string, any>;
  fetchPolicy?: FetchPolicy;
}

export const getListProducts = async (props: ProductActionInterface) => {
  const result = await client.query({
    query: GET_LIST_PRODUCTS,
    variables: props.variables,
    fetchPolicy: props.fetchPolicy,
  });

  return result;
};

export const getListProductVariants = async (props: ProductActionInterface) => {
  const result = await client.query({
    query: GET_LIST_PRODUCT_VARIANTS,
    variables: props.variables,
    fetchPolicy: props.fetchPolicy,
  });

  return result;
};
