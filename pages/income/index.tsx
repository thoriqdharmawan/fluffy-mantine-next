import { Button } from '@mantine/core';
import { useBills } from '../../context/bills';

import MainLayout from '../../layouts/MainLayout';

export default function Income() {
  const bills = useBills();

  return (
    <MainLayout>
      <Button onClick={() => bills.Open()}>Open Bills</Button>
      <Button onClick={() => bills.Close()}>Close Bills</Button>
      <Button onClick={() => bills.Toggle()}>Toggle Bills</Button>
    </MainLayout>
  );
}
