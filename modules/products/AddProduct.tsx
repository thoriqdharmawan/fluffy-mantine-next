import {
  TextInput,
  Textarea,
  NumberInput,
  Select,
  MultiSelect,
  Button,
  Group,
  Box,
  Divider,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import DrawerContainer from '../../components/drawer/DrawerContainer';
import { useState } from 'react';
import { GLOABL_STATUS, GLOBAL_SELECT_TYPE, DEFAULT_CATEGORY } from '../../mock/global';

interface Props {
  opened: boolean;
  onClose: () => void;
}

export default function AddProduct(props: Props) {
  const { opened, onClose } = props;

  const [categories, setCategories] = useState(DEFAULT_CATEGORY);

  const form = useForm({
    initialValues: {
      name: '',
      stock: undefined,
      price: undefined,
      description: '',
    },

    validate: {
      name: (value) => (!value ? 'This field is required' : null),
      stock: (value) => (!value ? 'This field is required' : null),
      price: (value) => (!value ? 'This field is required' : null),
    },
  });

  const handleClose = () => {
    onClose();
    form.clearErrors();
    form.reset();
  };

  const fieldsList = [
    {
      field: 'name',
      label: 'Product Name',
      placeholder: 'Add Product Name',
      component: TextInput,
      withAsterisk: true,
      ...form.getInputProps('name'),
    },
    {
      field: 'sku',
      label: 'SKU',
      description: 'Contoh: BN1C123',
      placeholder: 'Add SKU',
      component: TextInput,
      withAsterisk: true,
      ...form.getInputProps('sku'),
    },
    {
      field: 'stock',
      label: 'Stock',
      placeholder: 'Add Stock',
      component: NumberInput,
      withAsterisk: true,
      ...form.getInputProps('stock'),
    },
    {
      field: 'price',
      label: 'Price',
      placeholder: 'Add Price',
      component: NumberInput,
      withAsterisk: true,
      min: 0,
      icon: 'Rp',
      parser: (value: any) => value.replace(/\$\s?|(,*)/g, ''),
      formatter: (value: any) =>
        !Number.isNaN(parseFloat(value)) ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '',
      ...form.getInputProps('price'),
    },
    {
      field: 'category',
      label: 'Category',
      placeholder: 'Add Category',
      component: MultiSelect,
      data: categories,
      searchable: true,
      creatable: true,
      getCreateLabel: (query: string) => `+ Create "${query}"`,
      onCreate: (query: any) => {
        const item = { value: query, label: query };
        setCategories((current: GLOBAL_SELECT_TYPE[]) => [...current, item]);
        return item;
      },
      ...form.getInputProps('category'),
    },
    {
      field: 'status',
      label: 'Status',
      placeholder: 'Choose Status',
      component: Select,
      data: [
        {
          value: GLOABL_STATUS.ACTIVE,
          label: 'Active',
        },
        {
          value: GLOABL_STATUS.INACTIVE,
          label: 'Inactive',
        },
      ],
      ...form.getInputProps('status'),
    },
    {
      field: 'description',
      label: 'Description',
      placeholder: 'Add Description',
      component: Textarea,
      ...form.getInputProps('description'),
    },
  ];

  const handleSubmit = () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      form.clearErrors();
      form.reset();
    }
  };

  return (
    <DrawerContainer title="Add New Product" opened={opened} onClose={handleClose}>
      <Box>
        {fieldsList?.map((list) => (
          <Box
            key={list.field} // @ts-ignore
            component={list.component}
            labelProps={{ mb: 8 }}
            mb={24}
            {...list}
          />
        ))}

        <Divider my="xl" size="md" />

        {fieldsList?.map((list) => (
          <Box
            key={list.field} // @ts-ignore
            component={list.component}
            labelProps={{ mb: 8 }}
            mb={24}
            {...list}
          />
        ))}
        <Group position="right" mt="md">
          <Button variant="subtle" onClick={handleSubmit}>
            Save and Add New
          </Button>
          <Button onClick={handleSubmit}>Save Product</Button>
        </Group>
      </Box>
    </DrawerContainer>
  );
}
