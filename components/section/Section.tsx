import { Paper } from '@mantine/core';

export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <Paper shadow="sm" radius="md" p="xl" mb="xl">
      {children}
    </Paper>
  );
}
