import { type FetchPolicy } from '@apollo/client';
import client from '../../apollo-client';

import { GET_LIST_PRODUCTS } from './product.graphql';

interface getListProduct {
  variables: Record<string, any>;
  fetchPolicy?: FetchPolicy;
}

export const getListProducts = async (props: getListProduct) => {
  const result = await client.query({
    query: GET_LIST_PRODUCTS,
    variables: props.variables,
    fetchPolicy: props.fetchPolicy,
  });

  return result;
};
