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
  Flex,
  Grid,
  Col,
  useMantineTheme,
} from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { IconCheck, IconExclamationMark } from '@tabler/icons';

import MainLayout from '../../layouts/MainLayout';
import DropzoneUpload from '../../components/dropzone/DropzoneUpload';

import AddProductVariant from '../../modules/products/form-add-product/AddProductVariant';
import AddProductNoVariant from '../../modules/products/form-add-product/AddProductNoVariant';

import { ProductsCardProps, DEFAULT_PRODUCT_CATEGORIES, ProductType } from '../../mock/products';
import { GLOABL_STATUS } from '../../mock/global';

import { useUser } from '../../context/user';
import client from '../../apollo-client';
import { ADD_PRODUCT } from '../../services/products/product.graphql';

type Props = {};

export interface FormValues extends ProductsCardProps {}

export default function AddProducts({}: Props) {
  const theme = useMantineTheme();
  const router = useRouter();
  const user = useUser();

  const [categories, setCategories] = useState(DEFAULT_PRODUCT_CATEGORIES);

  const form = useForm<FormValues>({
    initialValues: {
      image:
        'https://firebasestorage.googleapis.com/v0/b/fluffy-d91c4.appspot.com/o/A_small_cup_of_coffee.jpg?alt=media&token=7a03e4e8-a163-4f7a-9979-06546cb4d04d',
      name: 'Kopi Kapal Api',
      description: '',
      categories: ['Makanan', 'Minuman'],
      type: 'NOVARIANT',
      variants: undefined,
      productVariants: [
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

  const { type } = form.values;

  const handleBack = () => {
    router.push('/products');
    form.clearErrors();
    form.reset();
  };

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      const { values } = form;

      const variables = {
        name: values.name,
        image: values.image,
        companyId: user.companyId,
        description: values.description,
        type: values.type,
        categories: values.categories?.map((category) => ({
          name: category,
          companyId: user.companyId,
        })),
        product_variants: values.productVariants?.map((product_variant) => ({
          coord: product_variant.coord,
          is_primary: product_variant.isPrimary,
          price: product_variant.price,
          sku: product_variant.sku,
          status: product_variant.status,
          stock: product_variant.stock,
        })),
      };

      client
        .mutate({
          mutation: ADD_PRODUCT,
          variables,
        })
        .then(() => {
          showNotification({
            title: 'Yeayy, Sukses!! 😊',
            message: 'Produk berhasil dibuat',
            icon: <IconCheck />,
            color: 'green',
          });
          handleBack()
        })
        .catch(() => {
          showNotification({
            title: 'Gagal Membuat Produk 🤥',
            message: 'Coba Lagi nanti',
            icon: <IconExclamationMark />,
            color: 'red',
          });
        });
    }
  };

  const handleOpenConfirmationVariants = (value: ProductType) => {
    openConfirmModal({
      title: 'Ubah Tipe Produk?',
      centered: true,
      overlayOpacity: 0.55,
      overlayBlur: 3,
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      children: (
        <Text size="sm">
          Apakah Anda yakin mengubah tipe produk? Detail Produk yang telah anda isi sebelumnya akan
          menghilang.
        </Text>
      ),
      labels: { confirm: 'Ya, Ubah Tipe Produk', cancel: 'Batalkan' },
      // onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        form.setFieldValue('type', value);
      },
    });
  };

  return (
    <MainLayout>
      <Text mb="lg">AddProducts</Text>
      <Paper shadow="sm" radius="md" p="xl" mb="xl">
        <Title order={4} mb="xl">
          Informasi Produk
        </Title>
        <Grid align="center" gutter="xl">
          <Col span="content">
            <DropzoneUpload form={form} mb="md" multiple={false} />
          </Col>
          <Col span={12} lg="auto">
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
              {...form.getInputProps('categories')}
            />

            <Textarea
              label="Deskripsi"
              placeholder="Tambahkan Deskripsi Produk"
              labelProps={{ mb: 8 }}
              mb={24}
              minRows={4}
              {...form.getInputProps('description')}
            />
          </Col>
        </Grid>
      </Paper>
      <Paper shadow="sm" radius="md" p="xl" mb="xl">
        <Title order={4} mb="xl">
          Detail Produk
        </Title>

        <SegmentedControl
          mb="md"
          onChange={handleOpenConfirmationVariants}
          value={type}
          data={[
            { label: 'Produk Tanpa Varian', value: 'NOVARIANT' },
            { label: 'Peroduk Dengan Varian', value: 'VARIANT' },
          ]}
        />
        {type === 'NOVARIANT' && <AddProductNoVariant form={form} />}
        {type === 'VARIANT' && <AddProductVariant />}
      </Paper>
      <Flex justify="space-between" align="center">
        <Button variant="subtle" onClick={handleBack}>
          Batalkan
        </Button>
        <Group position="right" mt="md">
          <Button variant="subtle" onClick={handleSubmit}>
            Simpan dan Tambah Baru
          </Button>
          <Button onClick={handleSubmit}>Tambahkan Produk</Button>
        </Group>
      </Flex>
    </MainLayout>
  );
}
