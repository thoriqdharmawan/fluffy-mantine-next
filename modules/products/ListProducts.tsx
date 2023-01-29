import { useState, useEffect } from 'react';
import { Grid, Text } from '@mantine/core';

import {
  DocumentData,
  getCountFromServer,
  getDocs,
  orderBy,
  query,
  collection,
} from 'firebase/firestore';

import { useBills } from '../../context/bills';

import ProductsCard from '../../components/cards/ProductsCard';

import { db } from '../../services/firebase';

type Props = {};

export default function ListProducts({}: Props) {
  const bills = useBills();
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);

  const productsRef = collection(db, 'products');

  const getData = async () => {
    try {
      const query_ = query(productsRef, orderBy('name', 'asc'));
      const data = await getDocs(query_);
      const aggregate = await getCountFromServer(productsRef);

      setData(data.docs.map((doc: DocumentData) => ({ ...doc.data(), id: doc.id })));
      setTotal(aggregate.data().count);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Text mb={12}>Total Data : {total}</Text>
      <Grid>
        {data?.map((product) => {
          return (
            <Grid.Col key={product.id} sm={bills.open ? 12 : 6} md={bills.open ? 6 : 4}>
              <ProductsCard {...product} />
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
}
