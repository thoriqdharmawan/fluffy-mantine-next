import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Box, Flex, Modal, Image, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { GET_DETAIL_PRODUCT } from '../../services/products';
import { PRODUCT_STATUS } from '../../constant/global';
import client from '../../apollo-client';
import Loading from '../loading/Loading';
import DetailProductVariant from './DetailProductVariant';

interface Props {
  opened: boolean;
  id: string | null;
  onClose: () => void;
  onUpdateStatus: (status: string) => void;
}

export default function DetailProduct(props: Props) {
  const { id, opened, onClose, onUpdateStatus } = props;

  const { data, loading, refetch } = useQuery(GET_DETAIL_PRODUCT, {
    client: client,
    skip: !opened,
    // fetchPolicy: 'cache-and-network',
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
      size="md"
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
      {!loading && (
        <Box mt="lg">
          <Text ta="center" fw={700} fz="xl" mb="md">
            {product.name}
          </Text>
          <Box mb="md">
            <Text fw={700}>Deskripsi Produk</Text>
            <Text>{product.description || '-'}</Text>
          </Box>

          <Box mb="md">
            <Text fw={700}>Varian Produk</Text>
            <Box mt="md">
              {product.product_variants?.map((productVariant: any, id: any) => {
                return (
                  <DetailProductVariant
                    key={id}
                    product={product}
                    productVariant={productVariant}
                  />
                );
              })}
            </Box>
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
      )}
      {loading && (
        <Box mt="lg">
          <Loading />
        </Box>
      )}
    </Modal>
  );
}
