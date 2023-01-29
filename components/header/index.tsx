import { Header as Head, Text, MediaQuery, Burger, useMantineTheme, Group } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { ColorSchemeToggle } from '../color-scheme-toggle';
import { UserLogin } from './UserLogin';

import BillsToggle from '../bills/BillsToggle';

type HeaderType = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

export default function Header(props: HeaderType) {
  const { opened, setOpened } = props;
  const theme = useMantineTheme();

  return (
    <Head height={{ base: 'auto', md: 70 }} p="md">
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

          <UserLogin
            image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            name="Harriette Spoonlicker"
            email="hspoonlicker@outlook.com"
          />
        </Group>
      </div>
    </Head>
  );
}
