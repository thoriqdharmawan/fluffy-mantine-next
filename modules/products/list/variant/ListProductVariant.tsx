import { ActionIcon, Box, Divider, Flex, Text, Switch } from '@mantine/core';
import { IconCalculator, IconDots } from '@tabler/icons';

import { convertToRupiah } from '../../../../context/helpers';
import MenuDropdown from '../../../../components/menu/MenuDropdown';
import StockEditable from '../StockEditable';

type Props = {
  id: number;
  name: string;
  sku: string;
  price: number;
  price_wholesale: number;
  min_wholesale: number;
  scale: number | undefined;
  stock: number;
  status: 'ACTIVE' | 'INACTIVE';
  onChangeStatus: () => void;
  onChangePrice: () => void;
  refetch: () => void;
  loadingUpdateStatus: boolean;
};

const Wholesale = ({ price, price_wholesale, min_wholesale }: { price: number, price_wholesale: number, min_wholesale: number }) => {
  if (price_wholesale === price || !price_wholesale) {
    return <Text color="dimmed" fs="italic" size="xs">Tidak ada harga grosir</Text>
  }

  return (
    <Flex direction="column">
      <Text>{convertToRupiah(price_wholesale)}</Text>
      <Text color="dimmed" size="sm">min. pembelian {min_wholesale}</Text>
    </Flex>
  )
}

export default function ListProductVariant(props: Props) {
  const { id, name, sku, price, price_wholesale, min_wholesale, stock, scale, status, loadingUpdateStatus, onChangeStatus, onChangePrice, refetch } = props;

  const PRODUCT_ACTION_MENUS = [
    {
      label: 'Produk',
      items: [
        {
          icon: <IconCalculator size={14} />,
          children: 'Ubah Harga',
          onClick: onChangePrice
        },
      ],
    },
  ];

  return (
    <>
      <Divider sx={(theme) => ({
        color: theme.colorScheme === 'dark'
          ? `${theme.colors.dark[6]}`
          : '#E5E7E9',
      })} />
      <Flex
        gap="md"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="nowrap"
        px="24px"
        py="md"
      >
        <Box w="30%">
          <Text mb="4px" fw={600}>
            {name}
          </Text>
          <Text color="dimmed" size="xs">
            SKU: {sku}
          </Text>
          <Text color="dimmed" mb="xs" size="xs">
            Skala Varian: {scale || 1}
          </Text>
        </Box>
        <Box w="20%">{convertToRupiah(price)}</Box>
        <Box w="20%">
          <Wholesale price={price} price_wholesale={price_wholesale} min_wholesale={min_wholesale} />
        </Box>
        <Box w="19%">
          <StockEditable id={id} stock={stock} refetch={refetch} />
        </Box>
        <Box w="6%">
          <Switch
            disabled={loadingUpdateStatus}
            checked={status === 'ACTIVE'}
            onChange={onChangeStatus}
            styles={{ root: { display: 'flex' }, track: { cursor: 'pointer' } }}
          />
        </Box>

        <Box w="5%">
          <Flex gap="sm" align="center">
            <MenuDropdown sections={PRODUCT_ACTION_MENUS}>
              <ActionIcon>
                <IconDots size={18} />
              </ActionIcon>
            </MenuDropdown>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}