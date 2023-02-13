import { FetchPolicy } from '@apollo/client';

import { GET_LIST_EMPLOYEES } from './employee.graphql';

import client from '../../apollo-client';

interface ActionInterface {
  variables: Record<string, any>;
  fetchPolicy?: FetchPolicy;
}

const getListEmployees = async (props: ActionInterface) => {
  const result = await client.query({
    query: GET_LIST_EMPLOYEES,
    variables: props.variables,
    fetchPolicy: props.fetchPolicy,
  });

  return result;
};

export { getListEmployees };
