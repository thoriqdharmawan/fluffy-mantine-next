import { useState, useEffect } from 'react';
import { Table, Paper, LoadingOverlay } from '@mantine/core';

import { getListProducts } from '../../services/products/getProducts';
import ListProductTableRow from './ListProductTableRow';

type Props = {
  search: string;
};

export default function ListProducts({ search }: Props) {
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getListProducts({
      variables: { company_id: '90417dfc-06fc-47ca-92be-9603be775301', search: `%${search}%` },
    }).then((result) => {
      setData(result.data);
      setLoading(result.loading);
    });
  }, [search]);

  return (
    <>
      <Paper>
        <Table
          sx={{ minWidth: 800 }}
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
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody style={{ position: 'relative' }}>
            <LoadingOverlay visible={loading} overlayBlur={2} />
            {data?.products?.map((res: any) => (
              <ListProductTableRow
                key={res.id}
                name={res.name}
                image={res.image}
                sku={res.product_variants?.[0]?.sku}
                price={res.product_variants?.[0]?.price}
                stock={res.product_variants?.[0]?.stock}
              />
            ))}
          </tbody>
        </Table>
      </Paper>
    </>
  );
}
