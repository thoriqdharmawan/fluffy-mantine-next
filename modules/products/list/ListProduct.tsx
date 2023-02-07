import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, Paper, LoadingOverlay } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconExclamationMark } from '@tabler/icons';

import { useUser } from '../../../context/user';
import { getListProducts } from '../../../services/products/getProducts';
import { DELETE_PRODUCT } from '../../../services/products/product.graphql';

import Header from './Header';
import ProductItem from './ProductItem';
import client from '../../../apollo-client';

type Props = {
  search: string;
};

export default function ListProduct(props: Props) {
  const { search } = props;

  const { companyId } = useUser();

  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    setLoading(true);
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
      getData();
    }
  }, [companyId, search]);

  const handleDeleteProduct = async (setLoading: Dispatch<SetStateAction<boolean>>, id: string) => {
    setLoading(true);
    await client
      .mutate({
        mutation: DELETE_PRODUCT,
        variables: { product_id: id },
      })
      .then(() => {
        getData();
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
      <Box pos="relative">
        <LoadingOverlay visible={!companyId || loading} overlayBlur={2} />
        {data?.products.map((product: any) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              sku={product.product_variants?.[0]?.sku}
              price={product.product_variants?.[0]?.price}
              stock={product.product_variants_aggregate.aggregate.sum.stock}
              categories={product.categories || []}
              type={product.type}
              onDelete={(setLoading) => handleDeleteProduct(setLoading, product.id)}
            />
          );
        })}
      </Box>
    </Paper>
  );
}
