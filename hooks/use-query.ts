/** @deprecated */
import {
  DocumentData,
  Query,
  getCountFromServer,
  getDocs,
  orderBy,
  query as q,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useQuery(query: Query) {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    try {
      const query_ = q(query, orderBy('name', 'asc'));
      const data = await getDocs(query_);
      const aggregate = await getCountFromServer(query);

      setData(data.docs.map((doc: DocumentData) => ({ ...doc.data(), id: doc.id })));
      setTotal(aggregate.data().count);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: getData,
    total,
  };
}
