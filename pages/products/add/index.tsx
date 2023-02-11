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
  LoadingOverlay,
  useMantineTheme,
} from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { FileWithPath } from '@mantine/dropzone';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { IconCheck, IconExclamationMark } from '@tabler/icons';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import client from '../../../apollo-client';

import MainLayout from '../../../layouts/MainLayout';
import DropzoneUpload from '../../../components/dropzone/DropzoneUpload';
import HeaderSection from '../../../components/header/HeaderSection';

import AddProductVariant from '../../../modules/products/form-add-product/AddProductVariant';
import AddProductNoVariant from '../../../modules/products/form-add-product/AddProductNoVariant';

import {
  ProductsCardProps,
  DEFAULT_PRODUCT_CATEGORIES,
  ProductType,
  VariantInterface,
} from '../../../mock/products';
import { GLOABL_STATUS } from '../../../mock/global';

import { useUser } from '../../../context/user';
import { addProduct, UPDATE_IMAGE_PRODUCT } from '../../../services/products';

export interface FormValues extends ProductsCardProps {}

export default function AddProducts() {
  const theme = useMantineTheme();
  const router = useRouter();
  const user = useUser();

  const [categories, setCategories] = useState(DEFAULT_PRODUCT_CATEGORIES);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loadingAddProduct, setLoadingAddProduct] = useState<boolean>(false);

  const form = useForm<FormValues>({
    initialValues: {
      image: '',
      name: '',
      description: '',
      categories: [],
      type: 'NOVARIANT',
      variants: [],
      productVariants: [
        {
          coord: [0],
          sku: undefined,
          price: undefined,
          stock: undefined,
          status: GLOABL_STATUS.ACTIVE,
          isPrimary: true,
        },
      ],
    },

    validate: {
      name: (value) => (!value ? 'Bagian ini diperlukan' : null),
      categories: (values: string[] | undefined) => {
        return !values || values?.length === 0 ? 'Bagian ini diperlukan' : null;
      },
      variants: {
        label: (value) => (!value ? 'Bagian ini diperlukan' : null),
        values: (values) => (values.length === 0 ? 'Bagian ini diperlukan' : null),
      },
      productVariants: {
        price: (value) => (!value ? 'Bagian ini diperlukan' : null),
        sku: (value) => (!value ? 'Bagian ini diperlukan' : null),
        stock: (value) => (!value ? 'Bagian ini diperlukan' : null),
      },
    },
  });

  const { type } = form.values;

  const handleBack = () => {
    router.push('/products');
    form.clearErrors();
    form.reset();
  };

  const handleDeleteFiles = () => {
    if (form?.values.image) {
      form.setValues({ image: '' });
    } else {
      setFiles([]);
    }
  };

  const showError = (title: string) => {
    showNotification({
      title: title,
      message: 'Coba Lagi nanti',
      icon: <IconExclamationMark />,
      color: 'red',
    });
  };

  const handleUploadImage = (productId: string) => {
    const storage = getStorage();
    const storageRef = ref(storage, 'products/' + productId);

    uploadBytes(storageRef, files[0])
      .then(() => {
        getDownloadURL(storageRef).then((url: string) => {
          client
            .mutate({
              mutation: UPDATE_IMAGE_PRODUCT,
              variables: {
                id: productId,
                image: url,
              },
            })
            .then(() => {
              showNotification({
                title: 'Yeayy, Sukses!! 😊',
                message: 'Produk berhasil dibuat',
                icon: <IconCheck />,
                color: 'green',
              });
            })
            .catch(() => showError('Gagal Menambahkan Foto Produk 🤥'))
            .finally(() => {
              setLoadingAddProduct(false);
              handleBack();
            });
        });
      })
      .catch(() => {
        setLoadingAddProduct(false);
        showError('Gagal Menambahkan Foto Produk 🤥');
      });
  };

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      setLoadingAddProduct(true);

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
        variants: values.variants?.map((variant) => ({
          name: variant.label,
          values: variant.values,
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

      addProduct({ variables })
        .then((res) => {
          handleUploadImage(res.data?.insert_products?.returning?.[0].id);
        })
        .catch(() => {
          showError('Gagal Membuat Produk 🤥');
          setLoadingAddProduct(false);
        });
    }
  };

  const handleOpenConfirmationVariants = (type: ProductType) => {
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
      onConfirm: () => {
        form.setValues((prev: Partial<FormValues>) => {
          const variants = type === 'VARIANT' ? [DEFAULT_VARIANT] : [];

          return {
            ...prev,
            type,
            variants: variants,
            productVariants: [],
          };
        });
      },
    });
  };

  return (
    <MainLayout>
      <LoadingOverlay visible={loadingAddProduct} overlayBlur={2} />

      <HeaderSection
        title="Tambah Produk"
        label="Anda dapat menambahkan produk baru ke dalam aplikasi kami dengan mudah dan cepat. Silakan
        isi informasi produk dengan benar dan tekan tombol Tambahkan Produk untuk menyimpan produk
        baru Anda."
        onBack={handleBack}
      />

      <Paper shadow="sm" radius="md" p="xl" mb="xl">
        <Title order={4} mb="xl">
          Informasi Produk
        </Title>
        <Grid align="center" gutter="xl">
          <Col span="content">
            <DropzoneUpload
              form={form}
              files={files}
              onDelete={handleDeleteFiles}
              dropzoneProps={{
                onDrop: setFiles,
                multiple: false,
                mb: 'md',
              }}
            />
          </Col>
          <Col span={12} lg="auto">
            <TextInput
              label="Nama Produk"
              placeholder="Tambahkan Nama Produk"
              labelProps={{ mb: 8 }}
              mb={24}
              withAsterisk
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
              withAsterisk
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
            { label: 'Produk Dengan Varian', value: 'VARIANT' },
          ]}
        />

        {type === 'NOVARIANT' && <AddProductNoVariant form={form} />}
        {type === 'VARIANT' && <AddProductVariant form={form} />}
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

export const DEFAULT_VARIANT: VariantInterface = {
  label: undefined,
  values: [],
};
