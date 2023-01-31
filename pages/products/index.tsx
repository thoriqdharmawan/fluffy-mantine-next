import { useState } from 'react';
import { Button, Flex } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import Link from 'next/link';

import MainLayout from '../../layouts/MainLayout';
import SearchBar from '../../components/SearchBar';

import ListProducts from '../../modules/products/ListProducts';

export default function Products() {
  const [search, setSearch] = useState('');
  const [debounce] = useDebouncedValue(search, 200);

  return (
    <MainLayout>
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb="24px"
        placeholder="Search Products"
      />

      <Flex mb={24} gap="md">
        <Link href="/products/add">
          <Button>Tambahkan Produk</Button>
        </Link>
      </Flex>

      <ListProducts search={debounce} />
    </MainLayout>
  );
}
