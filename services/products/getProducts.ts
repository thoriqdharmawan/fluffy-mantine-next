import { type FetchPolicy } from '@apollo/client';
import client from '../../apollo-client';

import { GET_LIST_PRODUCTS, GET_LIST_PRODUCT_VARIANTS } from './product.graphql';

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

export const getListProductVariants = async (props: getListProduct) => {
  const result = await client.query({
    query: GET_LIST_PRODUCT_VARIANTS,
    variables: props.variables,
    fetchPolicy: props.fetchPolicy,
  });

  return result;
};

interface VariantInterface {
  id?: number;
  name?: string;
  values: string[];
}

export const getVarinatName = (coord: number[], variants: VariantInterface[]) => {
  const coord1 = coord[0];
  const coord2 = coord[1];
  const name = variants?.[0].values[coord1];
};
