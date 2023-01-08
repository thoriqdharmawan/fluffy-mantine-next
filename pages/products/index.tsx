import { Box, TextInput, Group, Textarea, Button, NumberInput, Table } from '@mantine/core';
import { useForm } from '@mantine/form';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebase';

import MainLayout from '../../layouts/MainLayout';
import useQuery from '../../hooks/use-query';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';

type ProductType = {
  name: string;
  stock: number;
  price: number;
  description: string;
};

export default function Products() {
  const productsRef = collection(db, 'products');
  const {data, loading, refetch} = useQuery(productsRef)

  const form = useForm({
    initialValues: {
      name: '',
      stock: 0,
      price: '0',
      description: '',
    },

    validate: {
      name: (value) => (value.length === 0 ? 'This field is required' : null),
      stock: (value) => (value === undefined ? 'This field is required' : null),
      price: (value) => (value === undefined ? 'This field is required' : null),
    },
  });

  const handleSubmitProducts = async (values: ProductType) => {
    
    try {
      const docRef = await addDoc(productsRef, values);
      console.log('Document written with ID: ', docRef.id);
      form.reset();
      showNotification({
        title: 'You did great',
        message: 'Successfully added product 🤥',
        icon: <IconCheck />,
        color: 'green'
      })
      refetch()
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const rows = data.map((product) => (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{product.stock}</td>
      <td>{product.price}</td>
      <td>{product.description}</td>
    </tr>
  ));

  return (
    <MainLayout>
      <div>Add Products</div>

      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values: any) => handleSubmitProducts(values))}>
          <TextInput
            withAsterisk
            label="Product Name"
            placeholder="Add Product Name"
            {...form.getInputProps('name')}
          />
          <NumberInput
            withAsterisk
            label="Stock"
            type="number"
            min={0}
            placeholder="Add Stock"
            {...form.getInputProps('stock')}
          />
          <NumberInput
            withAsterisk
            label="Price"
            placeholder="Add Price"
            icon="Rp"
            min={0}
            parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            formatter={(value: any) =>
              !Number.isNaN(parseFloat(value))
                ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : ''
            }
            {...form.getInputProps('price')}
          />
          <Textarea
            label="Description"
            placeholder="Add Description"
            {...form.getInputProps('description')}
          />

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </MainLayout>
  );
}
