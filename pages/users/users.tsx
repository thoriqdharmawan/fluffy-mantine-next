import { useEffect } from 'react';

import { gql, useQuery } from '@apollo/client';
import MainLayout from '../../layouts/MainLayout';
import client from '../../apollo-client';

const LIST_USERS = gql`
  query GetListUsers {
    users {
      email
      id
      last_seen
    }
  }
`;

const getUsers = async () => {
  const { data, error, loading } = await client.query({
    query: LIST_USERS,
  });

  console.log({ data, error, loading });
};

export default function users() {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <MainLayout>
      <h1>Hello</h1>
    </MainLayout>
  );
}
