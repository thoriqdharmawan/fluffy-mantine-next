import { memo } from 'react';
import { NumberInput, TextInput, Switch } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { FormValues } from '../../../pages/products/add';

type Props = {
  coord?: number[];
  form: UseFormReturnType<FormValues>;
  index: number;
};

const VariantTableRow = memo(function VariantTableRowMemo(props: Props) {
  const { coord, form, index } = props;
  const { variants, productVariants } = form.values;

  const variant1 = variants?.[0]?.values?.[coord?.[0] || 0];
  const variant2 = variants?.[1]?.values?.[coord?.[1] || 0];

  const { has_price_wholesale } = productVariants?.[index] || {}

  return (
    <tr>
      <td valign='top'>
        {variant1} {variant2 && `- ${variant2}`}
      </td>
      <td valign='top'>
        <NumberInput
          min={0}
          icon="Rp"
          mb="md"
          withAsterisk
          hideControls
          label="Harga Jual"
          labelProps={{ mb: 8 }}
          placeholder="Tambahkan Harga Jual"
          parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
          formatter={(value: any) =>
            !Number.isNaN(parseFloat(value)) ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
          }
          {...form.getInputProps(`productVariants.${index}.price`)}
        />
        <Switch
          label="Tambahkan Harga Jual Grosir?"
          mb="md"
          checked={has_price_wholesale}
          {...form.getInputProps(`productVariants.${index}.has_price_wholesale`)}
        />
        {has_price_wholesale && (
          <NumberInput
            min={0}
            mb="md"
            icon="Rp"
            withAsterisk={has_price_wholesale}
            hideControls
            labelProps={{ mb: 8 }}
            label="Harga Jual Grosir"
            placeholder="Tambahkan Harga Jual Grosir"
            parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            formatter={(value: any) =>
              !Number.isNaN(parseFloat(value)) ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
            }
            {...form.getInputProps(`productVariants.${index}.price_wholesale`)}
          />
        )}
        {has_price_wholesale && (
          <NumberInput
            label="Minimal Pembelian Grosir"
            placeholder="Tambahkan Minimal Pembelian Grosir"
            min={1}
            withAsterisk={has_price_wholesale}
            labelProps={{ mb: 8 }}
            mb={24}
            {...form.getInputProps(`productVariants.${index}.min_wholesale`)}
          />
        )}
      </td>
      <td valign='top'>
        <TextInput
          // withAsterisk
          label="SKU Produk"
          placeholder="Tambahkan SKU"
          labelProps={{ mb: 8 }}
          {...form.getInputProps(`productVariants.${index}.sku`)}
        />
      </td>
      <td valign='top'>
        <NumberInput
          // withAsterisk
          label="Stock Produk"
          placeholder="Tambahkan Stok Produk"
          labelProps={{ mb: 8 }}
          {...form.getInputProps(`productVariants.${index}.stock`)}
        />
      </td>
      <td valign='top'>
        <Switch
          onLabel="Ya"
          offLabel="Tidak"
          styles={{ trackLabel: { fontSize: 12 }, track: { cursor: 'pointer' } }}
          size="lg"
          {...form.getInputProps(`productVariants.${index}.isPrimary`, { type: 'checkbox' })}
        />
      </td>
    </tr>
  );
});

export default VariantTableRow;
