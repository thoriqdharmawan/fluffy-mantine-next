import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, Paper, LoadingOverlay } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconExclamationMark } from '@tabler/icons';

import { useUser } from '../../../context/user';
import { getListProducts, DELETE_PRODUCT } from '../../../services/products';

import Header from './Header';
import ProductItem from './ProductItem';
import client from '../../../apollo-client';
import { deleteProductImage } from '../../../services/products';

type Props = {
  search: string;
};

export default function ListProduct(props: Props) {
  const { search } = props;

  const { companyId } = useUser();

  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);

  const getData = (withLoading: boolean) => {
    if (withLoading) {
      setLoading(true);
    }
    getListProducts({
      variables: { company_id: companyId, search: `%${search}%` },
      fetchPolicy: 'network-only',
    }).then((result) => {
      setData(result.data);
      setLoading(result.loading);
    });
  };

  useEffect(() => {
    if (companyId) {
      getData(true);
    }
  }, [companyId, search]);

  const handleDeleteProduct = async (setLoading: Dispatch<SetStateAction<boolean>>, id: string) => {
    setLoading(true);

    const promise1 = deleteProductImage(id);
    const promise2 = client.mutate({
      mutation: DELETE_PRODUCT,
      variables: { product_id: id },
    });

    Promise.all([promise1, promise2])
      .then(() => {
        getData(true);
        showNotification({
          title: 'Yeayy, Berhasil Menghapus Produk!! 😊',
          message: 'Produk berhasil dihapus',
          icon: <IconCheck />,
          color: 'green',
        });
      })
      .catch(() => {
        showNotification({
          title: 'Gagal Menghapus Produk 🤥',
          message: 'Coba Lagi nanti',
          icon: <IconExclamationMark />,
          color: 'red',
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Paper shadow="md" radius="md">
      <Header />
      <Box pos="relative" mih={300}>
        <LoadingOverlay visible={!companyId || loading} overlayBlur={2} />
        {data?.products.map((product: any) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              product_variants={product.product_variants}
              stock={product.product_variants_aggregate.aggregate.sum.stock}
              categories={product.categories || []}
              type={product.type}
              onDelete={(setLoading) => handleDeleteProduct(setLoading, product.id)}
              onCompleteUpdate={() => getData(false)}
            />
          );
        })}
      </Box>
    </Paper>
  );
}
