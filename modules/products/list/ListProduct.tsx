import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Box, Paper, Button, ScrollArea, Pagination, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconExclamationMark, IconPlus } from '@tabler/icons';
import { usePagination } from '@mantine/hooks';
import { useQuery } from '@apollo/client';
import Link from 'next/link';

import { useUser } from '../../../context/user';
import { deleteProduct, GET_LIST_PRODUCTS } from '../../../services/products';
import { Empty } from '../../../components/empty-state';
import client from '../../../apollo-client';

import Header from './Header';
import ProductItem from './ProductItem';
import Loading from '../../../components/loading/Loading';
import ChangeProductPrices from './modal/ChangeProductPrices';

type Props = {
  search: string;
};

const LIMIT = 5;

export default function ListProduct(props: Props) {
  const { search } = props;
  const { companyId } = useUser();

  const [changePrice, setChangePrice] = useState<{ open: boolean, id?: string }>({
    open: false,
    id: undefined,
  })

  const pagination = usePagination({ total: 10, initialPage: 1 });

  const { data, loading, error, refetch } = useQuery(GET_LIST_PRODUCTS, {
    client: client,
    variables: {
      limit: LIMIT,
      offset: (pagination.active - 1) * LIMIT,
      where: {
        company: { id: companyId ? { _eq: companyId } : undefined },
        name: search ? { _ilike: `%${search}%` } : undefined,
      },
    }
  })

  useEffect(() => {
    pagination.setPage(1)
  }, [search])


  if (error) {
    console.error(error)
  }

  const handleDeleteProduct = (
    setLoading: Dispatch<SetStateAction<boolean>>,
    productId: string
  ) => {
    setLoading(true);

    deleteProduct(productId)
      .then(() => {
        refetch();
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

  const totalPage = Math.ceil((data?.total.aggregate.count || 0) / LIMIT);

  return (
    <>
      <ScrollArea style={{ width: 'auto', height: 'auto' }}>
        <Paper miw={1000} shadow="md" radius="md" p="md" mx="auto">
          <Header />
          <Box pos="relative" mih={120}>
            {loadingData && <Loading height={120} />}
            {!loadingData && data?.total.aggregate.count === 0 && (
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

            {!loading && data?.products.map((product: any) => {
              return (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  product_variants={product.product_variants}
                  stock={product.product_variants_aggregate.aggregate.sum.stock}
                  product_variants_aggregate={product?.product_variants_aggregate}
                  categories={product.categories || []}
                  type={product.type}
                  onDelete={(setLoading) => handleDeleteProduct(setLoading, product.id)}
                  onCompleteUpdate={() => refetch()}
                  onChangePrice={() => setChangePrice({ open: true, id: product.id })}
                />
              );
            })}
          </Box>

          <Group mt={24} mb={12}>
            <Pagination m="auto" page={pagination.active} total={totalPage} onChange={pagination.setPage} />
          </Group>
        </Paper>
      </ScrollArea>

      <ChangeProductPrices
        opened={changePrice.open}
        id={changePrice.id}
        refetch={refetch}
        onClose={() => setChangePrice({ open: false, id: undefined })}
      />
    </>

  );
}
