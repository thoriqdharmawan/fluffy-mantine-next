import { Drawer, ScrollArea, useMantineTheme} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

interface Props {
  title: string | React.ReactNode;
  opened: boolean;
  onClose: () => void;
  children: JSX.Element;
}

export default function DrawerContainer(props: Props) {
  const { opened, onClose, title, children } = props;

  const matches = useMediaQuery('(min-width: 800px)');
  const theme = useMantineTheme();

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      position="right"
      title={title}
      padding={matches ? 'lg' : 'xs'}
      size={800}
    >
      <ScrollArea offsetScrollbars style={{ height: 'calc(100vh - 88px)' }}>
        {children}
      </ScrollArea>
    </Drawer>
  );
}
