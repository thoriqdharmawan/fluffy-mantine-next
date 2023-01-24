import { useState } from 'react';
import { Group, Select, MultiSelect, Button, Table, Title, SelectItem } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import {
  DEFAULT_VARIANTS_TYPE,
  DEFAULT_VARIANTS_TYPE_NAME,
  VARIANTS_TYPE,
} from '../../../mock/product-varian-types';

type SelectVariantType = {
  variantNames: VARIANTS_TYPE[];
  onVariantTypeSelect: () => void;
  onCreateVariantNames: (query: string) => SelectItem | string | null | undefined;
};

const SelectVariant = ({
  variantNames,
  onCreateVariantNames,
  onVariantTypeSelect,
}: SelectVariantType) => {
  const [variant, setVariant] = useState<VARIANTS_TYPE[]>(DEFAULT_VARIANTS_TYPE);

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
        onChange={onVariantTypeSelect}
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
          const item = { value: query, label: query };
          setVariant((current) => [...current, item]);
          return query;
        }}
        data={variant}
      />
    </Group>
  );
};

export default function AddProductVariant() {
  const [variantNames, setVariantNames] = useState<VARIANTS_TYPE[]>(DEFAULT_VARIANTS_TYPE_NAME);

  const handleSelectVariantType = () => {};

  const handleCreateVariantNames = (query: string) => {
    const item = { value: query, label: query, disabled: false };
    setVariantNames((current) => [...current, item]);
    return query;
  };

  return (
    <>
      <SelectVariant
        variantNames={variantNames}
        onVariantTypeSelect={handleSelectVariantType}
        onCreateVariantNames={handleCreateVariantNames}
      />

      <SelectVariant
        variantNames={variantNames}
        onVariantTypeSelect={handleSelectVariantType}
        onCreateVariantNames={handleCreateVariantNames}
      />

      <Button leftIcon={<IconPlus size="16" />} variant="default" size="xs" mt="md">
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
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* <tbody>{rows}</tbody> */}
      </Table>
    </>
  );
}
