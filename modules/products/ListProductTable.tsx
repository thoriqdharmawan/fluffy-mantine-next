import { useState, useEffect } from 'react';

import { Table, Paper } from '@mantine/core';
import { getProducts } from '../../services/products/getProducts';
import ListProductTableRow from './ListProductTableRow';
import { ProductsCardProps } from '../../mock/products';

type Props = {};

function ListProductTable({}: Props) {
  const [result, setResult] = useState<{ data: any[]; total: number } | undefined>({
    data: [],
    total: 0,
  });

  useEffect(() => {
    const promise: Promise<{ data: ProductsCardProps[]; total: any } | undefined> = getProducts();

    promise.then((res) => {
      setResult(res);
    });
  }, []);

  console.log(result);

  return (
    <Paper>
      <Table sx={{ minWidth: 800 }} horizontalSpacing="xl" verticalSpacing="sm" striped withBorder>
        <thead>
          <tr>
            <th>Foto</th>
            <th>SKU</th>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Stock</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {result?.data.map((res) => (
            <tr key={res.id}>
              <ListProductTableRow
                id={res.id}
                image={res.image}
                name={res.name}
                description={res.description}
                type={res.type}
              />
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
}

export default ListProductTable;
