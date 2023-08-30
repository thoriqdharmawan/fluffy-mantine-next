import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Box, Flex, Modal, Image, Text, ActionIcon, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FileWithPath } from '@mantine/dropzone';
import { useMediaQuery } from '@mantine/hooks';
import { IconCheck, IconX, IconEdit } from '@tabler/icons';

import { GET_DETAIL_PRODUCT, UPDATE_PRODUCT_DETAIL } from '../../services/products';
import { PRODUCT_STATUS } from '../../constant/global';

import client from '../../apollo-client';
import Loading from '../loading/Loading';
import DetailProductVariant from './DetailProductVariant';
import DropzoneUpload from '../dropzone/DropzoneUpload';
import { handleUploadProductImage } from '../dropzone/UploadImage';
import { showNotification } from '@mantine/notifications';

interface Props {
  opened: boolean;
  id: string | null;
  onClose: () => void;
  onUpdateStatus: (status: string) => void;
}

interface FormValues {
  image: string | undefined;
  name: string | undefined;
  description: string | undefined;
}

export default function DetailProduct(props: Props) {
  const { id, opened, onClose, onUpdateStatus } = props;
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [updateImage, setUpdateImage] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [adding, setAdding] = useState<boolean>(false);

  const form = useForm<FormValues>({
    initialValues: {
      image: '',
      name: '',
      description: '',
    },
    validate: {
      name: (value) => (!value ? 'Bagian ini diperlukan' : null),
    },
  });
  const [updateDetailProduct] = useMutation(UPDATE_PRODUCT_DETAIL, { client });

  const { data, loading, refetch } = useQuery(GET_DETAIL_PRODUCT, {
    client: client,
    skip: !opened,
    // fetchPolicy: 'cache-and-network',
    variables: {
      product_id: id,
    },
    onCompleted: ({ products }) => {
      const { image, name, description } = products?.[0] || {};
      form.setValues({ image, name, description });
    },
  });

  const product = useMemo(() => data?.products?.[0] || {}, [data]);

  const isMobile = useMediaQuery('(max-width: 50em)');

  const handleChangeStatus = (status: string) => {
    refetch();
    onUpdateStatus(status);
    onClose();
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const resetState = () => {
    setEditing(false);
    setAdding(false);
  };

  const handleSubmitEdit = async () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      setLoadingUpdate(true);
      const { name, image, description } = form.values;

      await updateDetailProduct({ variables: { id, name, image, description } })
        .then(() => {
          if (updateImage) {
            handleUploadProductImage({
              productId: id,
              setLoading: (loading) => {
                setLoadingUpdate(loading);
                setUpdateImage(loading);
              },
              files,
            });
          } else {
            setLoadingUpdate(false);
            showNotification({
              title: 'Yeayy, Sukses!! 😊',
              message: 'Produk berhasil dibuat',
              icon: <IconCheck />,
              color: 'green',
            });
          }
          resetState();
          refetch();
        })
        .catch(() => {
          setLoadingUpdate(false);
          resetState();
        });
    }

    toggleEditing();
  };

  const handleDeleteFiles = () => {
    setUpdateImage(true);
    if (form?.values.image) {
      form.setValues({ image: '' });
    } else {
      setFiles([]);
    }
  };

  const handleCloseModal = () => {
    onClose();
    resetState();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleCloseModal}
      title="Detail Produk"
      size="md"
      fullScreen={isMobile}
      centered
    >
      {editing ? (
        <DropzoneUpload
          form={form}
          files={files}
          onDelete={handleDeleteFiles}
          wrapperImageAlign="center"
          dropzoneProps={{
            onDrop: setFiles,
            multiple: false,
          }}
        />
      ) : (
        <Image
          maw={300}
          height={300}
          mx="auto"
          radius="md"
          src={product.image}
          alt={product.name}
          withPlaceholder
        />
      )}

      {!loading && (
        <Box mt="lg">
          <Text ta="center" fw={700} fz="xl" mb="md">
            {editing ? (
              <TextInput
                mt="xs"
                withAsterisk
                placeholder="Tambahkan Nama Produk"
                {...form.getInputProps('name')}
              />
            ) : (
              product.name
            )}
          </Text>
          <Box mb="lg">
            <Text fw={700}>Deskripsi Produk</Text>
            <Box>
              {editing ? (
                <TextInput
                  mt="xs"
                  placeholder="Tambahkan Deskripsi Produk"
                  {...form.getInputProps('description')}
                />
              ) : (
                <Text>{product.description || '-'}</Text>
              )}
            </Box>
          </Box>

          {editing ? (
            <Flex mb="xl" justify="end" gap="xs">
              <ActionIcon
                disabled={loadingUpdate}
                onClick={toggleEditing}
                variant="default"
                color="red"
              >
                <IconX size="1.125rem" />
              </ActionIcon>
              <ActionIcon
                disabled={loadingUpdate}
                onClick={handleSubmitEdit}
                variant="filled"
                color="blue"
              >
                <IconCheck size="1.125rem" />
              </ActionIcon>
            </Flex>
          ) : (
            <Flex mt="lb" justify="end">
              <ActionIcon disabled={loading} onClick={toggleEditing} variant="filled" color="blue">
                <IconEdit size="1.125rem" />
              </ActionIcon>
            </Flex>
          )}

          <Box mb="md">
            <Text fw={700}>Varian Produk</Text>
            <Box mt="md">
              {product.product_variants?.map((productVariant: any, id: any) => {
                return (
                  <DetailProductVariant
                    key={id}
                    product={product}
                    productVariant={productVariant}
                    refetch={refetch}
                  />
                );
              })}
            </Box>
          </Box>

          {adding && (
            <DetailProductVariant
              type="ADD"
              refetch={refetch}
              onClose={resetState}
              product={product}
            />
          )}

          <Button mt="md" mb="xl" variant="default" fullWidth onClick={() => setAdding(true)}>
            Tambah Varian Baru
          </Button>

          <Flex justify="end" gap="md" mb="lg">
            {product.status === PRODUCT_STATUS.ACTIVE && (
              <Button
                mt="xl"
                variant="default"
                fullWidth={isMobile}
                onClick={() => handleChangeStatus(PRODUCT_STATUS.OPNAME)}
              >
                Pindah ke Opname
              </Button>
            )}
            {product.status === PRODUCT_STATUS.OPNAME && (
              <>
                <Button
                  mt="xl"
                  color="red"
                  variant="light"
                  fullWidth={isMobile}
                  onClick={() => handleChangeStatus(PRODUCT_STATUS.DELETE)}
                >
                  Hapus Produk
                </Button>
                <Button
                  mt="xl"
                  fullWidth={isMobile}
                  onClick={() => handleChangeStatus(PRODUCT_STATUS.ACTIVE)}
                >
                  Pindah ke Produk Aktif
                </Button>
              </>
            )}
            {product.status === PRODUCT_STATUS.WAITING_FOR_APPROVAL && (
              <>
                <Button
                  mt="xl"
                  color="red"
                  variant="light"
                  fullWidth={isMobile}
                  onClick={() => handleChangeStatus(PRODUCT_STATUS.REJECT)}
                >
                  Tolak
                </Button>
                <Button
                  mt="xl"
                  fullWidth={isMobile}
                  onClick={() => handleChangeStatus(PRODUCT_STATUS.ACTIVE)}
                >
                  Setujui Produk
                </Button>
              </>
            )}
          </Flex>
        </Box>
      )}
      {loading && (
        <Box mt="lg">
          <Loading />
        </Box>
      )}
    </Modal>
  );
}
