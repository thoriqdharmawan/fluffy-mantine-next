import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, Paper, LoadingOverlay, Button, ScrollArea } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconExclamationMark, IconPlus } from '@tabler/icons';

import { useUser } from '../../../context/user';
import { getListProducts, deleteProduct } from '../../../services/products';

import Header from './Header';
import ProductItem from './ProductItem';
import { Empty } from '../../../components/empty-state';
import Link from 'next/link';

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

  const handleDeleteProduct = (
    setLoading: Dispatch<SetStateAction<boolean>>,
    productId: string
  ) => {
    setLoading(true);

    deleteProduct(productId)
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

  const loadingData = !companyId || loading;

  return (
    <ScrollArea style={{ width: 'auto', height: 'auto' }}>
      <Paper w={1187} shadow="md" radius="md">
        <Header />
        <Box pos="relative" mih={120}>
          <LoadingOverlay visible={loadingData} overlayBlur={2} />
          {data?.total.aggregate.count === 0 && (
            <Empty
              title="Tidak Ada Produk"
              label="Anda belum menambahkan produk apapun. Mulai dengan menekan tombol Tambah Produk."
              action={
                <Link href="/products/add">
                  <Button leftIcon={<IconPlus size={16} />} mt="xl">
                    Tambah Produk
                  </Button>
                </Link>
              }
            />
          )}

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
    </ScrollArea>
  );
}
