import { useState } from 'react';

import { Button } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons';

import Link from 'next/link';

import SearchBar from '../../components/SearchBar';
import MainLayout from '../../layouts/MainLayout';

import ListEmployee from '../../modules/employee/list/ListEmployee';
import HeaderSection from '../../components/header/HeaderSection';

type Props = {};

export default function index({ }: Props) {
  const [search, setSearch] = useState<string>('');
  const [debounce] = useDebouncedValue(search, 200);

  return (
    <MainLayout>
      <HeaderSection
        title="Daftar Karyawan"
        label="Anda dapat melihat daftar karyawan yang terdaftar dalam aplikasi kami. Anda juga dapat menambahkan, mengedit, dan menghapus karyawan sesuai kebutuhan. Klik pada karyawan untuk melihat detail atau mulai mengedit informasi karyawan."
        // action={
        //   <Link href="/employee/add">
        //     <Button leftIcon={<IconPlus size={16} />}>Tambah Karyawan</Button>
        //   </Link>
        // }
      />

      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb="24px"
        placeholder="Cari Karyawan"
      />

      <ListEmployee search={debounce} />
    </MainLayout>
  );
}
