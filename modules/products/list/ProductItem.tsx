import { Dispatch, SetStateAction, useState } from 'react';
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
} from '@mantine/core';
import {
  IconCalculator,
  IconCheck,
  IconDots,
  IconEdit,
  IconExclamationMark,
  IconSelector,
  IconTransform,
  IconTrash,
} from '@tabler/icons';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';

import { GET_LIST_PRODUCT_VARIANTS, UPDATE_STATUS_PRODUCT } from '../../../services/products/product.graphql';
import { convertToRupiah } from '../../../context/helpers';
import client from '../../../apollo-client';

import Loading from '../../../components/loading/Loading';
import ListProductVariant from './variant/ListProductVariant';
import MenuDropdown from '../../../components/menu/MenuDropdown';
import ChangeProductPrice from './modal/ChangeProductPrice';
import StockEditable from './StockEditable';
import SwitchStock from './modal/SwitchStock';

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
  onChangePrice: () => void;
}

interface HandleChangeStatus {
  id: number;
  status: 'ACTIVE' | 'INACTIVE';
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
    onChangePrice,
  } = props;

  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [loadingUpdateStatus, setLoadingUpdateStatus] = useState<boolean>(false);
  const [openSwitchStock, setOpenSwitchStock] = useState<boolean>(false)

  const [isOpenVariant, setIsOpenVariant] = useState<boolean>(false);
  const [changePrice, setChangePrice] = useState<{ opened: boolean, id?: number }>({
    opened: false,
    id: undefined
  });

  const { data: dataVariants, loading: loadingVariants, refetch } = useQuery(GET_LIST_PRODUCT_VARIANTS, {
    client: client,
    fetchPolicy: 'network-only',
    skip: !productId || !isOpenVariant,
    variables: { productId: productId }
  })

  const handleChangeStatus = ({ id, status }: HandleChangeStatus) => {
    setLoadingUpdateStatus(true);
    client
      .mutate({
        mutation: UPDATE_STATUS_PRODUCT,
        variables: { id, status: status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' },
      })
      .then(() => {
        if (isVariant) {
          refetch()
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
          icon: <IconCalculator size={14} />,
          children: 'Ubah Harga',
          onClick: onChangePrice
        },
        ...(type === 'VARIANT' ? [{
          icon: <IconTransform size={14} />,
          children: 'Bongkar Pasang Stok',
          onClick: () => setOpenSwitchStock(true),
        }] : []),
        {
          icon: <IconEdit size={14} />,
          children: 'Ubah',
          onClick: () => router.push(`/products/edit/${productId}`),
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

  const { sku, id, status, price, price_wholesale } = product_variants?.[0] || {}

  const VT = <Text color="dimmed" fs="italic" size="xs">Buka varian produk untuk melihat harga</Text>
  const NoWholsale = <Text color="dimmed" fs="italic" size="xs">Tidak ada harga grosir</Text>
  const isVariant = type === 'VARIANT'

  const prices = isVariant ? VT : convertToRupiah(price || 0)
  const prices_wholesale = isVariant ? VT : (price_wholesale ? convertToRupiah(price_wholesale || 0) : NoWholsale)

  return (
    <>
      <Divider />
      <Box>
        <Flex gap="md" justify="flex-start" align="center" direction="row" wrap="nowrap" px="24px">
          <Box w="35%" display="flex" py={12}>
            <AspectRatio ratio={1 / 1} maw={100} w="100%">
              <Image
                withPlaceholder
                src={image}
                radius="md"
                color="blue"
                width="100%"
                height="auto"
              />
            </AspectRatio>
            <Flex justify="center" align="flex-start" direction="column" ml="md">
              <Text size="md" mb={4}>
                {name}
              </Text>
              <Text color="dimmed" mb="xs" size="xs">
                SKU: {sku || '-'}
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
          <Box w="18%">{prices}</Box>
          <Box w="17%">{prices_wholesale}</Box>
          <Box w="15%">
            <StockEditable stock={stock} id={id} editable={type === 'NOVARIANT'} refetch={onCompleteUpdate} />
          </Box>
          {/* <Box w="4%">
            {type === 'NOVARIANT' && (
              <Switch
                disabled={loadingUpdateStatus}
                checked={status === 'ACTIVE'}
                styles={{ root: { display: 'flex' }, track: { cursor: 'pointer' } }}
                onChange={() => handleChangeStatus({ id, status })}
              />
            )}
          </Box> */}
          <Box w="9%">
            <Flex gap="sm" align="center">
              <MenuDropdown sections={PRODUCT_ACTION_MENUS}>
                <ActionIcon disabled={loadingDelete}>
                  <IconDots size={18} />
                </ActionIcon>
              </MenuDropdown>

              {loadingDelete && <Loader size="xs" color="gray" />}
            </Flex>
          </Box>
        </Flex>
        {isVariant && (
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
              onClick={() => setIsOpenVariant(!isOpenVariant)}
            >
              <Text size="sm" fw={700} color="dimmed">
                Lihat varian produk
              </Text>

              <IconSelector size={16} />
            </UnstyledButton>

            {isOpenVariant && loadingVariants && (<Loading count={2} height={46} />)}
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
                    id={productVariant.id}
                    name={[variant1, variant2].filter((data) => data).join(' | ')}
                    sku={productVariant.sku}
                    price={productVariant.price}
                    price_wholesale={productVariant.price_wholesale}
                    min_wholesale={productVariant.min_wholesale}
                    scale={productVariant.scale}
                    stock={productVariant.stock}
                    // status={productVariant.status}
                    // loadingUpdateStatus={loadingUpdateStatus}
                    // onChangeStatus={() =>
                    //   handleChangeStatus({
                    //     id: productVariant.id,
                    //     status: productVariant.status,
                    //   })
                    // }
                    onChangePrice={() => setChangePrice({ opened: true, id: productVariant.id })}
                    refetch={refetch}
                  />
                );
              })}
          </Box>
        )}
      </Box>

      <ChangeProductPrice
        opened={changePrice.opened}
        id={changePrice.id}
        onClose={() => setChangePrice({ opened: false, id: undefined })}
        refetch={refetch}
      />

      <SwitchStock
        opened={openSwitchStock}
        id={productId}
        onClose={() => setOpenSwitchStock(false)}
        refetch={() => setIsOpenVariant(false)}
      />
    </>
  );
};

export default ProductItem;
