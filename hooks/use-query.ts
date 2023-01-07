import { DocumentData, Query, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useQuery(query: Query) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    const data = await getDocs(query);
    setData(data.docs.map((doc: DocumentData) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    loading,
    refetch: getData,
  };
}
