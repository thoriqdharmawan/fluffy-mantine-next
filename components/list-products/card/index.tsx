import { Grid } from '@mantine/core';
import CardItem from './CardItem';

import { Props } from '../interface';

export default function ListProductCard(props: Partial<Props>) {
  const { data, loading } = props;

  return (
    <Grid gutterXs="sm" gutterMd="xl">
      {!loading &&
        data?.products?.map((product: any) => (
          <Grid.Col key={product.id} span={6} xs={6} md={4} lg={3}>
            <CardItem name={product.name} image={product.image} />
          </Grid.Col>
        ))}
    </Grid>
  );
}
