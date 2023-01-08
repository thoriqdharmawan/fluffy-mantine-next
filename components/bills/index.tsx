import { Transition, Paper, Button, CloseButton, Group } from '@mantine/core';
import { useBills } from '../../context/bills';

const scaleX = {
  in: { opacity: 1, transform: 'scaleX(1)' },
  out: { opacity: 1, transform: 'scaleX(0)' },
  common: { transformOrigin: 'right' },
  transitionProperty: 'transform, opacity',
};

const sx = {
  top: 0,
  left: 0,
  right: 0,
  height: '100%',
  width: '100%',
  maxWidth: '320px',
};

export default function BillsCollector() {
  const bills = useBills();

  return (
    <Transition mounted={bills.open} transition={scaleX} duration={200} timingFunction="ease">
      {(styles) => (
        <Paper
          shadow="md"
          radius="md"
          p="md"
          sx={{...styles, ...sx,}}
        >
          <Group position="right">
            <CloseButton size="sm" onClick={() => bills.Close()} aria-label="Close modal" />
          </Group>
          <Button onClick={() => bills.Close()}>Close</Button>
        </Paper>
      )}
    </Transition>
  );
}
