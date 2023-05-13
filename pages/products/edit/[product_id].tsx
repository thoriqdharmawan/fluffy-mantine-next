import {
  Box,
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

import { useEffect, useState } from 'react';
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
  ProductType,
  VariantInterface,
  TableProductsVariants,
} from '../../../mock/products';
import { GLOABL_STATUS } from '../../../mock/global';

import { useUser } from '../../../context/user';
import { editProduct, getProductById, UPDATE_IMAGE_PRODUCT } from '../../../services/products';
import { ProductVariants, Variants } from '../../../services/products/product.interface';
import { useGlobal } from '../../../context/global';

export interface FormValues extends ProductsCardProps { }

export default function EditProducts() {
  const { value } = useGlobal()
  const theme = useMantineTheme();
  const router = useRouter();
  const user = useUser();
  const companyId = value.selectedCompany || user.companyId

  const { product_id } = router.query;

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updateImage, setUpdateImage] = useState<boolean>(false)

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
          price: undefined, // harga normal
          has_price_purchase: false,
          price_purchase: undefined, // harga beli
          has_price_wholesale: false,
          price_wholesale: undefined, // harga grosir
          min_wholesale: undefined, // minimal pembelian grosir
          has_variant_scale: false,
          variant_scale: 1,
          stock: undefined,
          status: GLOABL_STATUS.ACTIVE,
          isPrimary: true,
        },
      ],
    },

    validate: {
      name: (value) => (!value ? 'Bagian ini diperlukan' : null),
      // categories: (values: string[] | undefined) => {
      //   return !values || values?.length === 0 ? 'Bagian ini diperlukan' : null;
      // },
      variants: {
        label: (value) => (!value ? 'Bagian ini diperlukan' : null),
        values: (values) => (values.length === 0 ? 'Bagian ini diperlukan' : null),
      },
      productVariants: {
        price: (value) => (!value ? 'Bagian ini diperlukan' : null),
        price_purchase: (value, values, path) => {
          const index: number = Number(path.split('.')[1] || 0)
          const isRequired = values.productVariants?.[index]?.has_price_purchase
          return (isRequired && !value) ? 'Bagian ini diperlukan' : null
        },
        price_wholesale: (value, values, path) => {
          const index: number = Number(path.split('.')[1] || 0)
          const isRequired = values.productVariants?.[index]?.has_price_wholesale
          return (isRequired && !value) ? 'Bagian ini diperlukan' : null
        },
        min_wholesale: (value, values, path) => {
          const index: number = Number(path.split('.')[1] || 0)
          const isRequired = values.productVariants?.[index]?.has_price_wholesale
          return (isRequired && !value) ? 'Bagian ini diperlukan' : null
        },
        // sku: (value) => (!value ? 'Bagian ini diperlukan' : null),
        // stock: (value) => (!value ? 'Bagian ini diperlukan' : null),
      },
    },
  });

  useEffect(() => {
    setLoading(true);
    getProductById({
      variables: { product_id },
      fetchPolicy: 'network-only',
    })
      .then(({ data }) => {

        const { name, image, description, categories, type, variants, product_variants } =
          data.products?.[0] || {};

        form.setValues({
          image,
          name,
          description,
          categories: categories?.map(({ name }: { name: string }) => name) || [],
          type,
          variants: variants.map((variant: Variants) => ({
            id: variant.id,
            label: variant.name,
            values: variant.values,
          })),
          productVariants: product_variants?.map((product: ProductVariants) => {
            const { price, price_purchase, price_wholesale, scale } = product

            return {
              id: product.id,
              coord: product.coord,
              sku: product.sku,
              price: price,
              price_purchase: price_purchase,
              price_wholesale: price_wholesale,
              min_wholesale: product.min_wholesale,
              has_variant_scale: (scale || 0) > 1,
              variant_scale: scale,
              stock: product.stock,
              status: product.status,
              isPrimary: product.is_primary,
              has_price_purchase: (price_purchase && price) !== price_purchase,
              has_price_wholesale: (price_wholesale && price) !== price_wholesale,
            }
          }),
        });
      })
      .finally(() => setLoading(false));
  }, [product_id]);

  const { type } = form.values;

  const handleBack = () => {
    router.push('/products');
    form.clearErrors();
  };

  const handleDeleteFiles = () => {
    setUpdateImage(true)
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
              setLoading(false);
              handleBack();
            });
        });
      })
      .catch(() => {
        setLoading(false);
        showError('Gagal Menambahkan Foto Produk 🤥');
      });
  };

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      setLoading(true);

      const { values } = form;

      const variables = {
        id: product_id,
        name: values.name,
        image: values.image,
        description: values.description,
        type: values.type,
        categories: values.categories?.map((category) => ({
          name: category,
          productId: product_id,
          companyId,
        })),
        variants: values.variants?.map((variant) => ({
          name: variant.label,
          values: variant.values,
          productId: product_id,
        })),
        product_variants: values.productVariants?.map((product_variant) => {
          const { has_price_purchase, has_price_wholesale, price_purchase, price_wholesale, price, variant_scale } = product_variant

          const pricePurchase = has_price_purchase ? price_purchase : price
          const priceWholesale = has_price_wholesale ? price_wholesale : price

          return {
            coord: product_variant.coord,
            is_primary: product_variant.isPrimary,
            price: product_variant.price,
            price_purchase: pricePurchase,
            price_wholesale: priceWholesale,
            min_wholesale: product_variant.min_wholesale || 1,
            scale: variant_scale || 1,
            sku: product_variant.sku,
            status: product_variant.status,
            stock: product_variant.stock,
            productId: product_id,
          }
        }),
      };

      editProduct({ variables })
        .then((res) => {
          if (updateImage) {
            handleUploadImage(res.data?.update_products?.returning?.[0].id);
          } else {
            setLoading(false);
            handleBack();
            showNotification({
              title: 'Yeayy, Sukses!! 😊',
              message: 'Produk berhasil dibuat',
              icon: <IconCheck />,
              color: 'green',
            });
          }
        })
        .catch(() => {
          showError('Gagal Membuat Produk 🤥');
          setLoading(false);
        });
    }
  };

  const handleOpenConfirmationVariants = (type: ProductType) => {
    openConfirmModal({
      title: 'Ubah Varian Produk?',
      centered: true,
      overlayOpacity: 0.55,
      overlayBlur: 3,
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      children: (
        <Text size="sm">
          Apakah Anda yakin mengubah varian produk? Varian produk yang telah anda isi sebelumnya akan
          menghilang.
        </Text>
      ),
      labels: { confirm: 'Ya, Ubah Varian Produk', cancel: 'Batalkan' },
      onConfirm: () => {
        form.setValues((prev: Partial<FormValues>) => {
          const isVariant = type === 'VARIANT';
          const variants = isVariant ? [DEFAULT_VARIANT] : [];
          const productVariants = isVariant ? [] : [DEFAULT_PRODUCT_VARIANT];

          return {
            ...prev,
            type,
            variants: variants,
            productVariants: productVariants,
          };
        });
      },
    });
  };

  return (
    <MainLayout>
      <HeaderSection
        title="Ubah Produk"
        label="Anda dapat mengubah produk yang telah anda tambahkan sebelumnya dengan mudah dan cepat. Silakan
        isi informasi produk dengan benar dan tekan tombol Tambahkan Produk untuk menyimpan produk
        baru Anda."
        onBack={handleBack}
      />

      <Box sx={{ position: 'relative' }}>
        <LoadingOverlay visible={loading} overlayBlur={2} />

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
              {/* <MultiSelect
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
              /> */}

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
            Varian Produk
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
          <Button onClick={handleSubmit}>Ubah Produk</Button>
        </Flex>
      </Box>
    </MainLayout>
  );
}

export const DEFAULT_VARIANT: VariantInterface = {
  label: undefined,
  values: [],
};

const DEFAULT_PRODUCT_VARIANT: TableProductsVariants = {
  coord: [0],
  sku: undefined,
  price: undefined,
  price_purchase: undefined,
  price_wholesale: undefined,
  min_wholesale: undefined,
  has_price_purchase: false,
  has_price_wholesale: false,
  stock: undefined,
  status: GLOABL_STATUS.ACTIVE,
  isPrimary: true,
};
