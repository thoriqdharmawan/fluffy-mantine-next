import { Chip, Group } from '@mantine/core';

interface Chips {
  label: string;
  value: string | number;
  checked: boolean
}

type Props = {
  data: Chips[];
  onChange: (v: string) => void;
}

export default function Chips(props: Props) {
  const { data, onChange } = props
  return (
    <Chip.Group onChange={onChange} mb="xl">
      <Group position="center">
        {data.map(({ label, value, checked }, idx) => (
          <Chip checked={checked} key={idx} value={value}>{label}</Chip>
        ))}
      </Group>
    </Chip.Group>
  )
}