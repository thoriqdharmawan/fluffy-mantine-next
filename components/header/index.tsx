import { Header as Head, Text, MediaQuery, Burger, useMantineTheme, Group } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { ColorSchemeToggle } from '../color-scheme-toggle';

import BillsToggle from '../bills/BillsToggle';

type HeaderType = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

export default function Header(props: HeaderType) {
  const { opened, setOpened } = props;
  const theme = useMantineTheme();

  return (
    <Head height={{ base: 50, md: 70 }} p="md">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o: SetStateAction<boolean>) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Text>Application Head</Text>
        <Group position="center">
          <BillsToggle />
          <ColorSchemeToggle />
        </Group>
      </div>
    </Head>
  );
}
