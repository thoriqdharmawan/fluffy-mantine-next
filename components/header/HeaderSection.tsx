import { ActionIcon, Box, Flex, Text, MantineTheme } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons';

type Props = {
  onBack?: () => void;
  title: string;
  label: string;
  action?: JSX.Element[] | JSX.Element;
};

export default function HeaderSection({ title, label, action, onBack }: Props) {
  return (
    <Flex
      align="center"
      justify="space-between"
      sx={(theme: MantineTheme) => ({
        marginBottom: theme.fontSizes.xl,
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
          padding: theme.fontSizes.md,
          flexDirection: 'column',
        },
      })}
    >
      <Box maw={700}>
        <Flex align="center" mb="md">
          {onBack && (
            <ActionIcon onClick={onBack} size="lg" radius="md" mr="sm" color="blue">
              <IconChevronLeft size={18} />
            </ActionIcon>
          )}
          <Text size="xl" fw={600}>
            {title}
          </Text>
        </Flex>
        <Text color="dimmed" size="sm">
          {label}
        </Text>
      </Box>
      <Box
        sx={(theme: MantineTheme) => ({
          [theme.fn.smallerThan('sm')]: {
            width: '100%',
            marginTop: '22px',
            display: 'flex',
            justifyContent: 'flex-end',
          },
        })}
      >
        {action}
      </Box>
    </Flex>
  );
}
