import { ApolloClient, InMemoryCache } from '@apollo/client';

const HASURA_ADMIN_SECRET = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || '';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_HASURA_URL,
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
  },
});

export default client;
