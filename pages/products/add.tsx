import {
  TextInput,
  Text,
  Paper,
  Title,
  Textarea,
  SegmentedControl,
  NumberInput,
  Group,
  Select,
  MultiSelect,
} from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';

import MainLayout from '../../layouts/MainLayout';
import DropzoneUpload from '../../components/dropzone/DropzoneUpload';

type Props = {};

export default function AddProducts({}: Props) {
  const [value, setValue] = useState('NOVARIANT');
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
    },

    validate: {
      name: (value) => (!value ? 'This field is required' : null),
    },
  });

  return (
    <MainLayout>
      <Text mb="lg">AddProducts</Text>
      <Paper shadow="sm" radius="md" p="xl" mb="xl">
        <Title order={4} mb="xl">
          Informasi Produk
        </Title>

        <DropzoneUpload mb="md" />

        <TextInput
          label="Nama Produk"
          placeholder="Tambahkan Nama Produk"
          labelProps={{ mb: 8 }}
          mb={24}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Kategori"
          placeholder="Tambahkan Kategori"
          labelProps={{ mb: 8 }}
          mb={24}
          {...form.getInputProps('category')}
        />

        <Textarea
          label="Kategori"
          placeholder="Tambahkan Deskripsi Produk"
          labelProps={{ mb: 8 }}
          mb={24}
          minRows={3}
          {...form.getInputProps('description')}
        />
      </Paper>
      <Paper shadow="sm" radius="md" p="xl" mb="xl">
        <Title order={4} mb="xl">
          Detail Produk
        </Title>

        <SegmentedControl
          mb="md"
          onChange={setValue}
          value={value}
          data={[
            { label: 'Produk Tanpa Varian', value: 'NOVARIANT' },
            { label: 'Peroduk Dengan Varian', value: 'VARIANT' },
          ]}
        />
        {value === 'VARIANT' ? (
          <Group sx={{ alignItems: 'end', flexWrap: 'nowrap' }}>
            <Select
              labelProps={{ mb: 8 }}
              mb={24}
              label="Tipe Varian"
              placeholder="Pilih Tipe Varian"
              data={[]}
            />
            <MultiSelect
              labelProps={{ mb: 8 }}
              mb={24}
              maw={600}
              w="100%"
              placeholder="Ketik untuk menambahkan tipe varian"
              data={[]}
            />
          </Group>
        ) : (
          <>
            <NumberInput
              label="Harga"
              placeholder="Tambahkan Harga"
              min={0}
              icon="Rp"
              labelProps={{ mb: 8 }}
              mb={24}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              formatter={(value: any) =>
                !Number.isNaN(parseFloat(value))
                  ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : ''
              }
              {...form.getInputProps('price')}
            />

            <TextInput
              label="SKU"
              placeholder="Tambahkan SKU"
              labelProps={{ mb: 8 }}
              mb={24}
              {...form.getInputProps('sku')}
            />
            
            <NumberInput
              label="Stok"
              placeholder="Tambahkan Stok"
              labelProps={{ mb: 8 }}
              mb={24}
              {...form.getInputProps('stock')}
            />
          </>
        )}
      </Paper>
    </MainLayout>
  );
}
