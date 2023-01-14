import { useState } from 'react';
import { Button, Box } from '@mantine/core';

import MainLayout from '../../layouts/MainLayout';
import SearchBar from '../../components/SearchBar';
import ListProducts from '../../modules/products/ListProducts';
import AddProduct from '../../modules/products/AddProduct';

export default function Products() {
  const [opened, setOpened] = useState(false);

  return (
    <MainLayout>
      <SearchBar mb="24px" placeholder="Search Products" />

      <Box mb={24}>
        <Button onClick={() => setOpened(true)}>Add Products</Button>
      </Box>

      <ListProducts />

      <AddProduct opened={opened} onClose={() => setOpened(false)} />
    </MainLayout>
  );
}
