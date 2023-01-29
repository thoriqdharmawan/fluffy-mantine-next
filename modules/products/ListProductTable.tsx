import { useState, useEffect } from 'react';

import { Table, Paper } from '@mantine/core';
import { getProducts } from '../../services/products/getProducts';
import ListProductTableRow from './ListProductTableRow';
import { ProductsCardProps } from '../../mock/products';
import { GET_LIST_PRODUCT } from './products.graphql';
import client from '../../apollo-client';

type Props = {};

const getListProducts = async () => {
  const { data, error, loading } = await client.query({
    query: GET_LIST_PRODUCT,
    variables: {
      companyId: '90417dfc-06fc-47ca-92be-9603be775301',
    },
  });

  return { data, error, loading }
};

function ListProductTable({}: Props) {
  const [result, setResult] = useState<{ data: any[]; total: number } | undefined>({
    data: [],
    total: 0,
  });

  useEffect(() => {
    // const promise: Promise<{ data: ProductsCardProps[]; total: any } | undefined> = getProducts();

    // promise.then((res) => {
    //   setResult(res);
    // });

    getListProducts().then((res) => {
      console.log("HASILNYA : ", res)
    })

  }, []);

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
