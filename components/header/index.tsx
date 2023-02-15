import { Header as Head, Text, MediaQuery, Burger, useMantineTheme, Group } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { ColorSchemeToggle } from '../color-scheme-toggle';
import { Fullscreen } from '../fullscreen';
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
        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
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
          <Fullscreen />

          <UserLogin />
        </Group>
      </div>
    </Head>
  );
}
