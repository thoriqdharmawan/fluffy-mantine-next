import { useMemo, useState } from 'react';
import { Group, Select, MultiSelect, Button, Table, Title, SelectItem } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import {
  DEFAULT_VARIANTS_TYPE,
  DEFAULT_VARIANTS_TYPE_NAME,
  VARIANTS_TYPE,
} from '../../../mock/product-varian-types';
import { UseFormReturnType } from '@mantine/form';

import { FormValues } from '../../../pages/products/add';
import { getCoord } from './form-product-helper';
import VariantTableRow from './VariantTableRow';

type SelectVariantType = {
  form: UseFormReturnType<FormValues>;
  variantNames: VARIANTS_TYPE[];
  onCreateVariantNames: (query: string) => SelectItem | string | null | undefined;
  index: number;
};

const SelectVariant = (props: SelectVariantType) => {
  const { form, index, variantNames, onCreateVariantNames } = props;

  const [variant, setVariant] = useState<string[]>(DEFAULT_VARIANTS_TYPE);

  return (
    <Group sx={{ alignItems: 'end' }}>
      <Select
        labelProps={{ mb: 8 }}
        mb={24}
        label="Tipe Varian"
        placeholder="Pilih Tipe Varian"
        data={variantNames}
        searchable
        creatable
        getCreateLabel={(query) => `+ Tambah "${query}"`}
        onCreate={onCreateVariantNames}
        {...form.getInputProps(`variants.${index}.label`)}
      />
      <MultiSelect
        placeholder="Ketik untuk menambahkan tipe varian"
        mb={24}
        maw={600}
        w="100%"
        searchable
        creatable
        labelProps={{ mb: 8 }}
        getCreateLabel={(query) => `+ Tambah "${query}"`}
        onCreate={(query) => {
          setVariant((current) => [...current, query]);
          return query;
        }}
        data={variant}
        {...form.getInputProps(`variants.${index}.values`)}
      />
    </Group>
  );
};

export default function AddProductVariant({ form }: { form: UseFormReturnType<FormValues> }) {
  const { variants } = form.values;

  const [totalVariants, setTotalVariants] = useState(variants?.length || 0);

  const [variantNames, setVariantNames] = useState<VARIANTS_TYPE[]>(DEFAULT_VARIANTS_TYPE_NAME);

  const handleCreateVariantNames = (query: string) => {
    const item = { value: query, label: query, disabled: false };
    setVariantNames((current) => [...current, item]);
    return query;
  };

  const coords = useMemo(
    () => getCoord(variants?.[0]?.values || [], variants?.[1]?.values || []),
    [variants]
  );

  const rows = coords?.map((coord, idx) => {
    return <VariantTableRow key={idx} coord={coord} form={form} />;
  });

  return (
    <>
      {variants?.map((variant, idx) => {
        return (
          <SelectVariant
            key={idx}
            variantNames={variantNames}
            onCreateVariantNames={handleCreateVariantNames}
            index={idx}
            form={form}
          />
        );
      })}

      <Button
        onClick={() => setTotalVariants((prev) => prev + 1)}
        leftIcon={<IconPlus size="16" />}
        variant="default"
        size="xs"
        mt="md"
      >
        Tambah Varian Baru
      </Button>

      <Title order={6} my="md">
        Tabel Varian
      </Title>

      <Table sx={{ minWidth: 800 }} horizontalSpacing="xl" verticalSpacing="sm" striped withBorder>
        <thead>
          <tr>
            <th>Nama Varian</th>
            <th>Harga</th>
            <th>SKU</th>
            <th>Stock Awal</th>
            <th>Produk Utama</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}
