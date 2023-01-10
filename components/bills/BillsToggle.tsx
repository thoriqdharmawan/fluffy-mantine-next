import { ActionIcon, MantineTheme } from '@mantine/core';
import React from 'react';
import { useBills } from '../../context/bills';
import { IconReceipt, IconReceiptOff } from '@tabler/icons';

const BillsToggle = () => {
  const bills = useBills();
  
  return (
    <ActionIcon
      onClick={() => bills.Toggle()}
      size="xl"
      sx={(theme: MantineTheme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
      })}
    >
      {bills.open ? (
        <IconReceiptOff size={20} stroke={1.5} />
      ) : (
        <IconReceipt size={20} stroke={1.5} />
      )}
    </ActionIcon>
  );
}

export default BillsToggle