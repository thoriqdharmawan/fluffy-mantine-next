import { useState } from 'react';
import { Button, Flex } from '@mantine/core';

import Link from 'next/link';

import MainLayout from '../../layouts/MainLayout';
import SearchBar from '../../components/SearchBar';
import ListProducts from '../../modules/products/ListProducts';
import AddProduct from '../../modules/products/AddProduct';

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

      <ListProducts />

      <AddProduct opened={opened} onClose={() => setOpened(false)} />
    </MainLayout>
  );
}
