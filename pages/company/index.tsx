import { DocumentData, collection, getDocs } from 'firebase/firestore';

import MainLayout from '../../layouts/MainLayout';
import { db } from '../../services/firebase';
import { useEffect, useState } from 'react';

export default function Company() {
  const [data, setData] = useState<any[]>([]);

  const companiesCollectionRef = collection(db, 'companies');

  useEffect(() => {
    const getCompanies = async () => {
      const data = await getDocs(companiesCollectionRef);
      setData(data.docs.map((doc: DocumentData) => ({ ...doc.data(), id: doc.id })));
    };

    getCompanies();
  }, []);

  return (
    <MainLayout>
      {data.map((res) => (
        <div key={res.id}>
          <h2>{res.name || '-'}</h2>
          <p>{res.address || '-'}</p>
        </div>
      ))}
    </MainLayout>
  );
}
