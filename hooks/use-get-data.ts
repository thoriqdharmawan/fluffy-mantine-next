/** @deprecated */
import { ApolloQueryResult } from '@apollo/client';
import { useEffect, useState } from 'react';

const getData = async (query: any, setResult: any) => {
  setResult((prev: any) => ({ ...prev, loading: true }));

  await query.then((res: any) => {
    setResult((prev: any) => {
      return {
        ...prev,
        ...res,
      };
    });
  });
};

interface UseGetData {
  query: Promise<ApolloQueryResult<any>>;
  variables?: any;
}

export default function useGetData(props: UseGetData) {
  const [result, setResult] = useState<any>({
    loading: true,
    data: undefined,
  });

  useEffect(() => {
    getData(props.query, setResult);
  }, []);

  return result;
}
