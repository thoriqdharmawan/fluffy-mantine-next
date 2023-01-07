import { useState } from 'react';
import { AppShell, Text, MediaQuery, Burger, useMantineTheme } from '@mantine/core';

import Navbar from '../components/navbar';
import Header from '../components/header';

export default function MainLayout({ children }: any) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<Navbar opened={opened} />}
      header={<Header opened={opened} setOpened={setOpened}  />}
    >
      {children}
    </AppShell>
  );
}
