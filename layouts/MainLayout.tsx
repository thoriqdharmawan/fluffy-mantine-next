import React, { useState } from 'react';
import { AppShell, useMantineTheme, Box } from '@mantine/core';

import Navbar from '../components/navbar';
import Header from '../components/header';
import BillsCollector from '../components/bills/BillsCollector';
import FooterLayout from '../components/footer/FooterLayout';

import { MOCK_FOOTER } from '../mock/footer';


export default function MainLayout({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          display: 'flex',
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<Navbar opened={opened} />}
      header={<Header opened={opened} setOpened={setOpened} />}
      footer={<FooterLayout data={MOCK_FOOTER.data} /> }
      layout='alt'
    >
      <Box w="100%" component='div'>
        {children}
      </Box>
      <BillsCollector />
    </AppShell>
  );
}
