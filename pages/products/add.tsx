import {
  TextInput,
  Text,
  Paper,
  Title,
  Textarea,
  SegmentedControl,
  MultiSelect,
  Group,
  Button,
} from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';

import MainLayout from '../../layouts/MainLayout';
import DropzoneUpload from '../../components/dropzone/DropzoneUpload';

import AddProductVariant from '../../modules/products/form-add-product/AddProductVariant';
import AddProductNoVariant from '../../modules/products/form-add-product/AddProductNoVariant';

import { ProductsCardProps, DEFAULT_PRODUCT_CATEGORIES } from '../../mock/products';
import { GLOABL_STATUS } from '../../mock/global';

type Props = {};

export interface FormValues extends ProductsCardProps {}

export default function AddProducts({}: Props) {
  const [categories, setCategories] = useState(DEFAULT_PRODUCT_CATEGORIES);
  const [value, setValue] = useState('NOVARIANT');

  const form = useForm<FormValues>({
    initialValues: {
      image: '',
      name: 'Kopi Kapal Api',
      description: '',
      category: ['Makanan', 'Minuman'],
      hasVariants: false,
      variants: undefined,
      prioductVariants: [
        {
          coord: [0, 0],
          sku: '123331',
          price: 1000,
          stock: 10,
          status: GLOABL_STATUS.ACTIVE,
          isPrimary: true,
        },
      ],
    },

    validate: {
      name: (value) => (!value ? 'This field is required' : null),
    },
  });


  const handleSubmit = () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      console.log(form.values)
      form.clearErrors();
      form.reset();
    }
  };

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
        <MultiSelect
          label="Kategori"
          placeholder="Tambahkan Kategori"
          labelProps={{ mb: 8 }}
          mb={24}
          data={categories}
          searchable
          creatable
          getCreateLabel={(query) => `+ Tambah "${query}"`}
          onCreate={(query) => {
            setCategories((current) => [...current, query]);
            return query;
          }}
          {...form.getInputProps('category')}
        />

        <Textarea
          label="Deskripsi"
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
        {value === 'NOVARIANT' && <AddProductNoVariant form={form} />}
        {value === 'VARIANT' && <AddProductVariant />}
      </Paper>
      <Group position="right" mt="md">
        <Button variant="subtle" onClick={handleSubmit}>
          Simpan dan Tambah Baru
        </Button>
        <Button onClick={handleSubmit}>Simpan Product</Button>
      </Group>
    </MainLayout>
  );
}
