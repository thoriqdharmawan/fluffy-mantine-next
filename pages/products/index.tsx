import { Grid } from '@mantine/core';
import { PRODUCTS } from '../../mock/products';

import MainLayout from '../../layouts/MainLayout';
import SearchBar from '../../components/SearchBar';
import ProductsCard from '../../components/cards/ProductsCard';
import { useBills } from '../../context/bills';

export default function Products() {
  const bills = useBills()

  return (
    <MainLayout>
      <SearchBar mb="24px" placeholder="Search Products" />
      <Grid>
        {PRODUCTS.map((product, idx) => (
          <Grid.Col key={idx} sm={bills.open ? 12 : 6} md={bills.open ? 6 : 4}>
            <ProductsCard {...product} />
          </Grid.Col>
        ))}
      </Grid>
    </MainLayout>
  );
}
