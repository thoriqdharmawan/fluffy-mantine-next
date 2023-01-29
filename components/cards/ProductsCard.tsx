import { useEffect, useState } from 'react';
import { collection, getDocs, query, DocumentData, where } from 'firebase/firestore';
import { IconTrash } from '@tabler/icons';
import { Card, Image, Text, Group, Button, ActionIcon, createStyles, Spoiler } from '@mantine/core';

import { ProductsCardProps } from '../../mock/products';

import { db } from '../../services/firebase';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },

  spoilerLabel: {
    fontSize: 12,
    marginTop: 12,
  },
}));

export default function ProductsCard({ id, image, name, description }: ProductsCardProps) {
  const { classes } = useStyles();
  const [data, setData] = useState<any>();

  const variantsRef = collection(db, 'productVariants');

  const getVariants = async () => {
    try {
      const q = query(variantsRef, where('productId', '==', id));
      const data = await getDocs(q);

      const result = data.docs.map((doc: DocumentData) => ({ ...doc.data(), id: doc.id }));

      setData(result?.[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVariants();
  }, []);

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={name} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Text size="sm" variant="gradient">
          {id}
        </Text>
        <Group position="apart">
          <Text size="lg" weight={500}>
            {name}
          </Text>
          <Text size="sm">{data?.productVariants?.[0].price}</Text>
        </Group>
        <Spoiler
          maxHeight={80}
          classNames={{ control: classes.spoilerLabel }}
          showLabel="Lihat Lebih Banyak"
          hideLabel="Lihat Lebih Sedikit"
        >
          <Text size="sm" mt="xs">
            {description}
          </Text>
        </Spoiler>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} color="dimmed">
          Perfect for you, if you enjoy
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Masukan ke Keranjang
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconTrash size={18} className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
