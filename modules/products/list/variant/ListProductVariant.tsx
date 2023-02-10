import { Box, Divider, Flex, Text, Switch } from '@mantine/core';

type Props = {
  name: string;
  sku: string;
  price: number;
  purchased: number;
  stock: number;
  status: 'ACTIVE' | 'INACTIVE';
  onChangeStatus: () => void;
  loadingUpdateStatus: boolean;
};

export default function ListProductVariant(props: Props) {
  const { name, sku, price, purchased, stock, status, loadingUpdateStatus, onChangeStatus } = props;

  return (
    <>
      <Divider color="#E5E7E9" />
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
        <Box w="21.6%">{purchased}</Box>
        <Box w="15.6%">{price}</Box>
        <Box w="16%">{stock}</Box>
        <Box w="6%">
          <Switch
            disabled={loadingUpdateStatus}
            checked={status === 'ACTIVE'}
            onChange={onChangeStatus}
            styles={{ root: { display: 'flex' }, track: { cursor: 'pointer' } }}
          />
        </Box>
        <Box w="5%"></Box>
      </Flex>
    </>
  );
}
