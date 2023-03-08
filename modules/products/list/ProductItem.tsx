import {
  Flex,
  Image,
  AspectRatio,
  ActionIcon,
  Text,
  Box,
  Divider,
  UnstyledButton,
  Badge,
  Loader,
  Switch,
} from '@mantine/core';
import {
  IconCheck,
  IconDots,
  IconEdit,
  IconEye,
  IconExclamationMark,
  IconSelector,
  IconTrash,
  IconCopy,
} from '@tabler/icons';
import { Dispatch, SetStateAction, useState } from 'react';

import MenuDropdown from '../../../components/menu/MenuDropdown';

import ListProductVariant from './variant/ListProductVariant';
import { getListProductVariants } from '../../../services/products';
import client from '../../../apollo-client';
import { UPDATE_STATUS_PRODUCT } from '../../../services/products/product.graphql';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { getPrices } from '../../../context/helpers';

interface CategoriesInterface {
  id: number;
  name: string;
}

interface ListProps {
  id: string;
  name: string;
  image: string;
  product_variants: any[];
  stock: number;
  categories: CategoriesInterface[] | void[];
  type: 'VARIANT' | 'NOVARIANT';
  onDelete: (setLoading: Dispatch<SetStateAction<boolean>>) => void;
  onCompleteUpdate: () => void;
  product_variants_aggregate: any;
}

interface HandleChangeStatus {
  id: number;
  status: 'ACTIVE' | 'INACTIVE';
  type: 'VARIANT' | 'NOVARIANT';
}

const ProductItem = (props: ListProps) => {
  const router = useRouter();
  const {
    id: productId,
    name,
    image,
    product_variants,
    stock,
    categories,
    type,
    onDelete,
    onCompleteUpdate,
    product_variants_aggregate,
  } = props;

  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [loadingUpdateStatus, setLoadingUpdateStatus] = useState<boolean>(false);
  const [loadingVariants, setLoadingVariants] = useState<boolean>(false);

  const [isOpenVariant, setIsOpenVariant] = useState<boolean>(false);
  const [dataVariants, setDataVariants] = useState<any>({});

  const getVariants = (productId: string, withLoading: boolean | undefined) => {
    if (withLoading) {
      setIsOpenVariant((prev: boolean) => !prev);
      setLoadingVariants(true);
    }
    getListProductVariants({
      variables: { productId },
      fetchPolicy: 'network-only',
    }).then((result) => {
      setDataVariants(result.data);
      setLoadingVariants(result.loading);
    });
  };

  const handleChangeStatus = ({ id, status, type }: HandleChangeStatus) => {
    setLoadingUpdateStatus(true);
    client
      .mutate({
        mutation: UPDATE_STATUS_PRODUCT,
        variables: { id, status: status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' },
      })
      .then(() => {
        if (type === 'VARIANT') {
          getVariants(productId, false);
        } else {
          onCompleteUpdate();
        }
        showNotification({
          title: 'Yeayy, Berhasil Mengubah Status Produk!! 😊',
          message: 'Status Produk Berhasil Diubah',
          icon: <IconCheck />,
          color: 'green',
        });
      })
      .catch(() => {
        showNotification({
          title: 'Gagal Menghapus Produk 🤥',
          message: 'Status Produk Gagal Diubah',
          icon: <IconExclamationMark />,
          color: 'red',
        });
      })
      .finally(() => setLoadingUpdateStatus(false));
  };

  const PRODUCT_ACTION_MENUS = [
    {
      label: 'Produk',
      items: [
        {
          icon: <IconEye size={14} />,
          children: 'Rincian',
        },
        {
          icon: <IconEdit size={14} />,
          children: 'Ubah',
          onClick: () => router.push(`/products/edit/${productId}`),
        },
        {
          icon: <IconCopy size={14} />,
          children: 'Duplikat',
        },
      ],
    },
    {
      items: [
        {
          icon: <IconTrash size={14} />,
          color: 'red',
          children: 'Hapus',
          onClick: () => onDelete(setLoadingDelete),
        },
      ],
    },
  ];
  const { max, min } = product_variants_aggregate?.aggregate || {};

  const prices = getPrices(max?.price, min?.price);

  return (
    <>
      <Divider />
      <Box>
        <Flex gap="md" justify="flex-start" align="center" direction="row" wrap="nowrap" px="24px">
          <Box w="35%" display="flex" py={12}>
            <AspectRatio ratio={1 / 1} w={100}>
              <Image
                withPlaceholder
                src={image}
                radius="md"
                color="blue"
                width={100}
                height={100}
              />
            </AspectRatio>
            <Flex justify="center" align="flex-start" direction="column" ml="md">
              <Text size="md" mb={4}>
                {name}
              </Text>
              <Text color="dimmed" mb="xs" size="xs">
                SKU: {product_variants?.[0]?.sku || '-'}
              </Text>
              <Flex gap="md" wrap="wrap">
                {categories.map((category: any) => {
                  return (
                    <Badge sx={{ textTransform: 'none' }} color="teal" key={category.id}>
                      {category.name}
                    </Badge>
                  );
                })}
              </Flex>
            </Flex>
          </Box>
          <Box w="35%">{prices}</Box>
          <Box w="15%">{stock}</Box>
          <Box w="6%">
            {type === 'NOVARIANT' && (
              <Switch
                disabled={loadingUpdateStatus}
                checked={product_variants?.[0]?.status === 'ACTIVE'}
                styles={{ root: { display: 'flex' }, track: { cursor: 'pointer' } }}
                onChange={() =>
                  handleChangeStatus({
                    id: product_variants?.[0]?.id,
                    status: product_variants?.[0]?.status,
                    type,
                  })
                }
              />
            )}
          </Box>
          <Box w="9%">
            <Flex gap="sm" align="center">
              <MenuDropdown sections={PRODUCT_ACTION_MENUS}>
                <ActionIcon>
                  <IconDots size={18} />
                </ActionIcon>
              </MenuDropdown>

              {loadingDelete && <Loader size="xs" color="gray" />}
            </Flex>
          </Box>
        </Flex>
        {type === 'VARIANT' && (
          <Box
            mx={36}
            mb={24}
            sx={(theme) => ({
              borderRadius: 5,
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : '#F3F4F5',
            })}
          >
            <UnstyledButton
              px={16}
              py={8}
              w="100%"
              display="flex"
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
              onClick={() => getVariants(productId, true)}
            >
              <Text size="sm" fw={700} color="dimmed">
                Lihat varian produk
              </Text>

              <IconSelector size={16} />
            </UnstyledButton>

            {isOpenVariant && loadingVariants && (
              <>
                <Flex justify="center" align="center" py="120px">
                  <Loader />
                </Flex>
                <Divider color="#E5E7E9" />
              </>
            )}

            {isOpenVariant &&
              !loadingVariants &&
              dataVariants?.product_variants?.map((productVariant: any) => {
                const { variants } = dataVariants;
                const { coord } = productVariant;

                const variant1 = variants?.[0]?.values[coord[0]] || null;
                const variant2 = variants?.[1]?.values[coord[1]] || null;

                return (
                  <ListProductVariant
                    key={productVariant.id}
                    name={[variant1, variant2].filter((data) => data).join(' | ')}
                    sku={productVariant.sku}
                    price={productVariant.price}
                    stock={productVariant.stock}
                    status={productVariant.status}
                    loadingUpdateStatus={loadingUpdateStatus}
                    onChangeStatus={() =>
                      handleChangeStatus({
                        id: productVariant.id,
                        status: productVariant.status,
                        type: 'VARIANT',
                      })
                    }
                  />
                );
              })}
          </Box>
        )}
      </Box>
    </>
  );
};

export default ProductItem;
