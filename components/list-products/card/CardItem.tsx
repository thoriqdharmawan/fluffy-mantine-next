import { Card, Image, Group, Text, Button } from '@mantine/core';

interface Props {
  name: string;
  image: string;
  onClickDetail: () => void;
}

export default function CardItem(props: Props) {
  const { name, image, onClickDetail } = props;

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={image} alt={name} withPlaceholder height={120} />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{name}</Text>
      </Group>

      <Button onClick={onClickDetail} variant="light" color="blue" fullWidth mt="md" radius="md">
        Lihat Detail
      </Button>
    </Card>
  );
}
