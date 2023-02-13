import { FetchPolicy } from '@apollo/client';
import { UPDATE_EMPLOYEE_STATUS } from './employee.graphql';
import client from '../../apollo-client';

interface ActionInterface {
  variables: Record<string, any>;
  fetchPolicy?: FetchPolicy;
}

const updateEmployeeStatus = async (props: ActionInterface) => {
  const result = await client.mutate({
    mutation: UPDATE_EMPLOYEE_STATUS,
    variables: props.variables,
  });

  return result;
};

export { updateEmployeeStatus };
