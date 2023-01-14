import { Grid } from '@mantine/core';

import { useBills } from '../../context/bills';
import { PRODUCTS } from '../../mock/products';

import ProductsCard from '../../components/cards/ProductsCard';

type Props = {};

export default function ListProducts({}: Props) {
  const bills = useBills();

  return (
    <Grid>
      {PRODUCTS.map((product, idx) => (
        <Grid.Col key={idx} sm={bills.open ? 12 : 6} md={bills.open ? 6 : 4}>
          <ProductsCard {...product} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
