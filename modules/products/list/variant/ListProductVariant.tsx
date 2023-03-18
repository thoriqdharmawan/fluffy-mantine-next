import { ActionIcon, Box, Divider, Flex, Text, Switch } from '@mantine/core';
import { convertToRupiah } from '../../../../context/helpers';
import MenuDropdown from '../../../../components/menu/MenuDropdown';
import { IconCalculator, IconDots, IconStack } from '@tabler/icons';

type Props = {
  name: string;
  sku: string;
  price: number;
  price_wholesale: number;
  stock: number;
  status: 'ACTIVE' | 'INACTIVE';
  onChangeStatus: () => void;
  onChangePrice: () => void;
  loadingUpdateStatus: boolean;
};

export default function ListProductVariant(props: Props) {
  const { name, sku, price, price_wholesale, stock, status, loadingUpdateStatus, onChangeStatus, onChangePrice } = props;

  const PRODUCT_ACTION_MENUS = [
    {
      label: 'Produk',
      items: [
        {
          icon: <IconCalculator size={14} />,
          children: 'Ubah Harga',
          onClick: onChangePrice
        },
        // {
        //   icon: <IconCalculator size={14} />,
        //   children: 'Tambah Stok',
        //   onClick: onChangePrice
        // },
        {
          icon: <IconStack size={14} />,
          children: 'Sesuaikan Stok',
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
        <Box w="33%">
          <Text mb="4px" fw={600}>
            {name}
          </Text>
          <Text color="dimmed" size="xs">
            SKU: {sku}
          </Text>
        </Box>
        <Box w="37.2%">{convertToRupiah(price)}</Box>
        <Box w="37.2%">{price_wholesale !== price ? convertToRupiah(price_wholesale) : '-'}</Box>
        <Box w="16%">{stock}</Box>
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
