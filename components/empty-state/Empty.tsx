import { useTheme } from '@emotion/react';
import { Box, Flex, Image, Text, Title } from '@mantine/core';

type Props = {
  title?: string;
  label?: string;
  action?: React.ReactNode
};

export default function Empty({title, label, action}: Props) {
  const theme = useTheme();

  return (
    <Flex justify="center" py={80}>
      <Flex direction="column" align="center">
        <Image
          radius="md"
          // @ts-ignore
          src={`/empty-state-${theme?.colorScheme || 'light'}.svg`}
          alt="Empty State"
          maw={360}
        />
        <Box mt={42}>
          <Title order={3} align="center">
            {title}
          </Title>
          <Text variant="text" mt="sm" maw={420} align="center">
            {label}
          </Text>
        </Box>
        {action}
      </Flex>
    </Flex>
  );
}
