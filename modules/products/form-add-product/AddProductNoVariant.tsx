import { NumberInput, TextInput } from '@mantine/core';
import { type UseFormReturnType } from '@mantine/form';

import { FormValues } from '../../../pages/products/add';

export default function AddProductNoVariant({ form }: { form: UseFormReturnType<FormValues> }) {
  return (
    <>
      <NumberInput
        label="Harga"
        placeholder="Tambahkan Harga"
        min={0}
        icon="Rp"
        labelProps={{ mb: 8 }}
        mb={24}
        parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
        formatter={(value: any) =>
          !Number.isNaN(parseFloat(value)) ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
        }
        {...form.getInputProps('productVariants.0.price')}
      />

      <TextInput
        label="SKU"
        placeholder="Tambahkan SKU"
        labelProps={{ mb: 8 }}
        mb={24}
        {...form.getInputProps('productVariants.0.sku')}
      />

      <NumberInput
        label="Stok"
        placeholder="Tambahkan Stok"
        labelProps={{ mb: 8 }}
        mb={24}
        {...form.getInputProps('productVariants.0.stock')}
      />
    </>
  );
}
