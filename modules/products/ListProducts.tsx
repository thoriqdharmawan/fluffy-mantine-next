import { useState, useEffect } from 'react';
import { Table, Paper, LoadingOverlay, Box } from '@mantine/core';
import { useUser } from '../../context/user';

import { getListProducts } from '../../services/products/getProducts';
import ListProductTableRow from './ListProductTableRow';
import client from '../../apollo-client';
import { DELETE_PRODUCT } from '../../services/products/product.graphql';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconExclamationMark } from '@tabler/icons';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';

type Props = {
  search: string;
};

export default function ListProducts({ search }: Props) {
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

  console.log(data);

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
    <>
      <Paper>
        <Box sx={{ position: 'relative' }}>
          <LoadingOverlay visible={!companyId || loading} overlayBlur={2} />
          <Table
            sx={{ minWidth: 800, position: 'relative' }}
            horizontalSpacing="xl"
            verticalSpacing="sm"
            striped
            withBorder
          >
            <thead>
              <tr>
                <th>Foto</th>
                <th>SKU</th>
                <th>Nama Produk</th>
                <th>Harga</th>
                <th>Total Stock</th>
                <th>Kategori</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((res: any) => (
                <ListProductTableRow
                  key={res.id}
                  name={res.name}
                  image={res.image}
                  sku={res.product_variants?.[0]?.sku}
                  price={res.product_variants?.[0]?.price}
                  stock={res.product_variants?.[0]?.stock}
                  categories={res.categories || []}
                  onDelete={(setLoading) => handleDeleteProduct(setLoading, res.id)}
                />
              ))}
            </tbody>
          </Table>
        </Box>
      </Paper>
    </>
  );
}
