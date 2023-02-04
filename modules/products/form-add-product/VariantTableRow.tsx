import { NumberInput, Input, Switch, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { FormValues } from '../../../pages/products/add';

type Props = {
  coord: number[];
  form: UseFormReturnType<FormValues>;
};

export default function VariantTableRow(props: Props) {
  const { coord, form } = props;
  const { variants } = form.values;

  const variant1 = variants?.[0]?.values?.[coord[0]];
  const variant2 = variants?.[1]?.values?.[coord[1]];

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
        />
      </td>
      <td>
        <Input placeholder="Tambahkan SKU" />
      </td>
      <td>
        <Input placeholder="Tambahkan Stok" />
      </td>
      <td>
        <Switch
          onLabel="Ya"
          offLabel="Tidak"
          styles={{ trackLabel: { fontSize: 12 }, track: { cursor: 'pointer' } }}
          size="lg"
        />
      </td>
    </tr>
  );
}
