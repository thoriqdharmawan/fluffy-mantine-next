import { useState } from 'react';
import { Button } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons';

import Link from 'next/link';

import MainLayout from '../../layouts/MainLayout';
import SearchBar from '../../components/SearchBar';

import ListProducts from '../../modules/products/list/ListProduct';
import HeaderSection from '../../components/header/HeaderSection';

export default function Products() {
  const [search, setSearch] = useState('');
  const [debounce] = useDebouncedValue(search, 200);

  return (
    <MainLayout>
      <HeaderSection
        title="Daftar Produk"
        label="Anda dapat melihat daftar produk yang telah Anda tambahkan ke dalam aplikasi kami. Anda dapat mengedit atau menghapus produk yang ada sesuai kebutuhan."
        action={
          <Link href="/products/add">
            <Button leftIcon={<IconPlus size={16} />}>Tambah Produk</Button>
          </Link>
        }
      />

      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb="24px"
        placeholder="Cari Produk"
      />

      <ListProducts search={debounce} />
    </MainLayout>
  );
}
