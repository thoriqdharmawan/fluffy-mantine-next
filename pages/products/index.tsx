import { useState } from 'react';
import { Button, Flex } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import Link from 'next/link';

import MainLayout from '../../layouts/MainLayout';
import SearchBar from '../../components/SearchBar';
import AddProduct from '../../modules/products/AddProduct';

import ListProducts from '../../modules/products/ListProducts';

export default function Products() {
  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState('');
  const [debounce] = useDebouncedValue(search, 200);

  console.log({ debounce, search });

  return (
    <MainLayout>
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb="24px"
        placeholder="Search Products"
      />

      <Flex mb={24} gap="md">
        <Button onClick={() => setOpened(true)}>Add Products</Button>
        <Link href="/products/add">
          <Button>Add Products New Page</Button>
        </Link>
      </Flex>

      <ListProducts search={debounce} />

      <AddProduct opened={opened} onClose={() => setOpened(false)} />
    </MainLayout>
  );
}
