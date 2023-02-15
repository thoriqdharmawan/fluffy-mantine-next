import { ActionIcon, Group, MantineTheme } from '@mantine/core';
import { useFullscreen } from '@mantine/hooks';
import { IconMaximize, IconMinimize } from '@tabler/icons';

type Props = {};

export function Fullscreen({}: Props) {
  const { toggle, fullscreen } = useFullscreen();

  return (
    <Group position="center">
      <ActionIcon
        onClick={toggle}
        size="xl"
        sx={(theme: MantineTheme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
        })}
      >
        {fullscreen ? <IconMinimize size={20} stroke={1.5} /> : <IconMaximize size={20} stroke={1.5} />}
      </ActionIcon>
    </Group>
  );
}
