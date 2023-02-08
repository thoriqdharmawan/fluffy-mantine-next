import { Box, Flex, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const Header = () => {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.md}px)`);

  return (
    <>
      <Flex
        gap="md"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="nowrap"
        px="24px"
        py={12}
        pos="sticky"
        top={matches ? 70 : 0}
        bg="#fff"
        sx={(theme) => ({
          zIndex: 4,
          borderBottom: '2px solid #E5E7E9',
          borderTopRightRadius: theme.fontSizes.md,
          borderTopLeftRadius: theme.fontSizes.md,
        })}
      >
        <Box fw={600} w="35%">
          Info Produk
        </Box>
        <Box fw={600} w="15%">
          Harga
        </Box>
        <Box fw={600} w="20%">
          Total Pembelian
        </Box>
        <Box fw={600} w="15%">
          Stock
        </Box>
        <Box fw={600} w="6%">
          Aktif
        </Box>
        <Box fw={600} w="9%">
          Action
        </Box>
      </Flex>
    </>
  );
};

export default Header;
