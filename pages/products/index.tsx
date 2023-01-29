import { useState } from 'react';
import { Button, Flex } from '@mantine/core';

import Link from 'next/link';

import MainLayout from '../../layouts/MainLayout';
import SearchBar from '../../components/SearchBar';
import AddProduct from '../../modules/products/AddProduct';

import ListProductTable from '../../modules/products/ListProductTable';
import ListProducts from '../../modules/products/ListProducts';

export default function Products() {
  const [opened, setOpened] = useState(false);

  return (
    <MainLayout>
      <SearchBar mb="24px" placeholder="Search Products" />

      <Flex mb={24} gap="md">
        <Button onClick={() => setOpened(true)}>Add Products</Button>
        <Link href="/products/add">
          <Button>Add Products New Page</Button>
        </Link>
      </Flex>
      

      <ListProductTable />
      <ListProducts />

      <AddProduct opened={opened} onClose={() => setOpened(false)} />
    </MainLayout>
  );
}
