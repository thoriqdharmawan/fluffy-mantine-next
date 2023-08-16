import { useState } from 'react';
import { Box, Button, Grid } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import Link from 'next/link';

import CardItem from './CardItem';
import Loading from '../../loading/Loading';

import { Props } from '../interface';
import { Empty } from '../../empty-state';
import DetailProduct from '../../modal/DetailProduct';

interface InitialDetail {
  open: boolean;
  id: null | string;
}

const INITIAL_DETAIL = {
  open: false,
  id: null,
};

const Loader = () => (
  <Box sx={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
    <Loading height={120} direction="row" count={2} />
    <Loading height={120} direction="row" count={2} />
    <Loading height={120} direction="row" count={2} />
  </Box>
);

export default function ListProductCard(props: Partial<Props>) {
  const [detail, setDetail] = useState<InitialDetail>(INITIAL_DETAIL);
  const { data, loading } = props;

  return (
    <>
      <Grid gutterXs="sm" gutterMd="xl">
        {!loading &&
          data?.products?.map((product: any) => (
            <Grid.Col key={product.id} span={6} xs={6} md={4} lg={3}>
              <CardItem
                name={product.name}
                image={product.image}
                onClickDetail={() => setDetail({ id: product.id, open: true })}
              />
            </Grid.Col>
          ))}
      </Grid>
      {loading && <Loader />}
      {!loading && data?.total.aggregate.count === 0 && (
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

      <DetailProduct opened={detail.open} onClose={() => setDetail(INITIAL_DETAIL)} />
    </>
  );
}
