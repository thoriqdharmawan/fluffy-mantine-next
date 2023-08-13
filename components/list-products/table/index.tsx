import {
  Button,
  Box,
  Flex,
  Paper,
  ScrollArea,
  useMantineTheme,
  Pagination,
  Group,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons';
import Link from 'next/link';

import Loading from '../../loading/Loading';
import { Empty } from '../../empty-state';

import ProductItem from '../../../modules/products/list/ProductItem';
import { Props } from '../interface';

export default function ListProductTable(props: Props) {
  const {
    loading,
    loadingData,
    data,
    productType,
    refetch,
    handleDeleteProduct,
    setChangePrice,
    handleUpdateStatus,
    page,
    totalPage,
    setPage,
  } = props;
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.md}px)`);

  return (
    <ScrollArea style={{ width: 'auto', height: 'auto' }}>
      <Paper miw={1000} shadow="md" radius="md" p="md" mx="auto">
        <Flex
          gap="md"
          justify="flex-start"
          align="center"
          direction="row"
          wrap="nowrap"
          px="24px"
          py={12}
          top={matches ? 70 : 0}
          sx={(theme) => ({
            zIndex: 4,
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
            borderBottom:
              theme.colorScheme === 'dark'
                ? `2px solid ${theme.colors.dark[6]}`
                : '2px solid #E5E7E9',
            borderTopRightRadius: theme.fontSizes.md,
            borderTopLeftRadius: theme.fontSizes.md,
          })}
        >
          <Box fw={600} w="35%">
            Info Produk
          </Box>
          <Box fw={600} w="18%">
            Harga
          </Box>
          <Box fw={600} w="17%">
            Harga Grosir
          </Box>
          <Box fw={600} w="15%">
            Stok
          </Box>
          <Box fw={600} w="9%">
            Aksi
          </Box>
        </Flex>
        <Box pos="relative" mih={320}>
          {loadingData && <Loading height={120} />}
          {!loadingData && data?.total.aggregate.count === 0 && (
            <Empty
              title="Tidak Ada Produk"
              label="Anda belum menambahkan produk apapun. Mulai dengan menekan tombol Tambah Produk."
              action={
                <Link href="/products/add">
                  <Button leftIcon={<IconPlus size={16} />} mt="xl">
                    Tambah Produk
                  </Button>
                </Link>
              }
            />
          )}

          {!loading &&
            data?.products.map((product: any) => {
              return (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  productType={productType}
                  product_variants={product.product_variants}
                  stock={product.product_variants_aggregate.aggregate.sum.stock}
                  categories={[]}
                  type={product.type}
                  onDelete={(setLoading) => handleDeleteProduct(setLoading, product.id)}
                  onCompleteUpdate={refetch}
                  onChangePrice={() => setChangePrice({ open: true, id: product.id })}
                  onChangeStatus={(status) => handleUpdateStatus(product.id, status)}
                  // onSwitchStock={(refetch: any) => setSwitchStock((prev: any) => ({ ...prev, opened: true, id: product.id, refetch }))}
                />
              );
            })}
        </Box>

        <Group mt={24} mb={12}>
          <Pagination m="auto" page={page} total={totalPage} onChange={setPage} />
        </Group>
      </Paper>
    </ScrollArea>
  );
}
