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
import { IconSelector, IconTrash } from '@tabler/icons';
import { Dispatch, SetStateAction, useState } from 'react';
import ListProductVariant from './variant/ListProductVariant';
import { getListProductVariants } from '../../../services/products/getProducts';

interface CategoriesInterface {
  id: number;
  name: string;
}

interface ListProps {
  id: string;
  name: string;
  image: string;
  sku: string;
  price: number;
  stock: number;
  categories: CategoriesInterface[] | void[];
  type: string;
  onDelete: (setLoading: Dispatch<SetStateAction<boolean>>) => void;
}

const ProductItem = (props: ListProps) => {
  const { id, name, image, sku, price, stock, categories, type, onDelete } = props;

  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [loadingVariants, setLoadingVariants] = useState<boolean>(false);
  const [isOpenVariant, setIsOpenVariant] = useState<boolean>(false);
  const [dataVariants, setDataVariants] = useState<any>({});

  const getVariants = (productId: string) => {
    setIsOpenVariant((prev: boolean) => !prev);
    setLoadingVariants(true);
    getListProductVariants({
      variables: { productId },
      fetchPolicy: 'network-only',
    }).then((result) => {
      setDataVariants(result.data);
      setLoadingVariants(result.loading);
    });
  };

  return (
    <>
      <Flex gap="md" justify="flex-start" align="center" direction="row" wrap="nowrap" px="24px">
        <Box w="35%" display="flex" py={12}>
          <AspectRatio ratio={1 / 1} w={100}>
            <Image radius="md" withPlaceholder src={image} />
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
        <Box w="15%">{price}</Box>
        <Box w="20%">123</Box>
        <Box w="15%">{stock}</Box>
        <Box w="6%">Aktif</Box>
        <Box w="9%">
          <ActionIcon loading={loadingDelete} onClick={() => onDelete(setLoadingDelete)}>
            <IconTrash size={18} />
          </ActionIcon>
        </Box>
      </Flex>
      {type === 'VARIANT' && (
        <Box mx={36} mb={24} bg="#F3F4F5" sx={{ borderRadius: 5 }}>
          <UnstyledButton
            px={16}
            py={8}
            w="100%"
            display="flex"
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            onClick={() => getVariants(id)}
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
                  purchased={10}
                  stock={productVariant.stock}
                  status={productVariant.status}
                />
              );
            })}
        </Box>
      )}
      <Divider />
    </>
  );
};

export default ProductItem;
