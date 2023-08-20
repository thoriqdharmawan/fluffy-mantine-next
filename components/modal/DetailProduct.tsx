import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Box, Flex, Modal, Image, Text, Table } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { GET_DETAIL_PRODUCT } from '../../services/products';
import client from '../../apollo-client';
import { convertToRupiah } from '../../context/helpers';
import { PRODUCT_STATUS } from '../../constant/global';

interface Props {
  opened: boolean;
  id: string | null;
  onClose: () => void;
  onUpdateStatus: (status: string) => void;
}

const ItemRow = (props: { label: string; value: string | number | undefined }) => {
  const { label, value } = props;

  return (
    <Flex align="center" justify="space-between">
      <Text>{label}</Text>
      <Text>{value}</Text>
    </Flex>
  );
};
export default function DetailProduct(props: Props) {
  const { id, opened, onClose, onUpdateStatus } = props;

  const { data, loading, refetch } = useQuery(GET_DETAIL_PRODUCT, {
    client: client,
    skip: !opened,
    fetchPolicy: 'cache-and-network',
    variables: {
      product_id: id,
    },
  });

  const product = useMemo(() => data?.products?.[0] || {}, [data]);

  const isMobile = useMediaQuery('(max-width: 50em)');

  const handleChangeStatus = (status: string) => {
    refetch();
    onUpdateStatus(status);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Detail Produk"
      size="xl"
      fullScreen={isMobile}
      centered
    >
      <Image
        maw={240}
        height={240}
        mx="auto"
        radius="md"
        src={product.image}
        alt={product.name}
        withPlaceholder
      />
      <Box mt="lg">
        <Text ta="center" fw={700} fz="xl" mb="md">
          {product.name}
        </Text>
        <Box mb="md">
          <Text fw={700}>Deskripsi Produk</Text>
          <Text>{product.description}</Text>
        </Box>

        <Box mb="md">
          <Text fw={700}>Varian Produk</Text>
          <Table mt="md" striped withBorder>
            <tbody>
              {product.product_variants?.map((productVariant: any) => {
                const { variants } = product;
                const { coord } = productVariant;

                const variant1 = variants?.[0]?.values[coord[0]] || null;
                const variant2 = variants?.[1]?.values[coord[1]] || null;

                return (
                  <tr>
                    <td>
                      <Box p="sm">
                        <Text fw={700} fz="md">
                          {[variant1, variant2].filter((data) => data).join(' | ')}
                        </Text>
                        <Text mb="sm">SKU: {productVariant.sku || '-'}</Text>
                        <Box>
                          <ItemRow
                            label="Harga"
                            value={convertToRupiah(productVariant.price) || '-'}
                          />
                          {productVariant.price !== productVariant.price_wholesale && (
                            <>
                              <ItemRow
                                label="Harga Grosir"
                                value={convertToRupiah(productVariant.price_wholesale) || '-'}
                              />
                              <ItemRow
                                label="Minimal Grosir"
                                value={productVariant.min_wholesale || '-'}
                              />
                            </>
                          )}
                          <ItemRow label="Stok" value={productVariant.stock || '0'} />
                        </Box>
                      </Box>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Box>

        <Flex justify="end" gap="md">
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
            <Button
              mt="xl"
              fullWidth={isMobile}
              onClick={() => handleChangeStatus(PRODUCT_STATUS.ACTIVE)}
            >
              Pindah ke Produk Aktif
            </Button>
          )}
          {product.status === PRODUCT_STATUS.WAITING_FOR_APPROVAL && (
            <>
              <Button
                mt="xl"
                color="red"
                variant="default"
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
    </Modal>
  );
}
