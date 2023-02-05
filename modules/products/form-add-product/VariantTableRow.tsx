import { memo } from 'react';
import { NumberInput, Input, Switch } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { FormValues } from '../../../pages/products/add';

type Props = {
  coord?: number[];
  form: UseFormReturnType<FormValues>;
  index: number;
};

const VariantTableRow = memo(function VariantTableRowMemo(props: Props) {
  const { coord, form, index } = props;
  const { variants } = form.values;

  const variant1 = variants?.[0]?.values?.[coord?.[0] || 0];
  const variant2 = variants?.[1]?.values?.[coord?.[1] || 0];

  return (
    <tr>
      <td>
        {variant1} {variant2 && `- ${variant2}`}
      </td>
      <td>
        <NumberInput
          placeholder="Tambahkan Harga"
          min={0}
          icon="Rp"
          parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
          formatter={(value: any) =>
            !Number.isNaN(parseFloat(value)) ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
          }
          {...form.getInputProps(`productVariants.${index}.price`)}
        />
      </td>
      <td>
        <Input
          placeholder="Tambahkan SKU"
          {...form.getInputProps(`productVariants.${index}.sku`)}
        />
      </td>
      <td>
        <NumberInput
          placeholder="Tambahkan Stok"
          {...form.getInputProps(`productVariants.${index}.stock`)}
        />
      </td>
      <td>
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
