import { useState } from 'react';
import { Group, Select, MultiSelect, Table, Title, SelectItem, Button } from '@mantine/core';
import {
  DEFAULT_VARIANTS_TYPE,
  DEFAULT_VARIANTS_TYPE_NAME,
  VARIANTS_TYPE,
} from '../../../mock/product-varian-types';
import { UseFormReturnType } from '@mantine/form';

import { DEFAULT_VARIANT, FormValues } from '../../../pages/products/add';
import { getCoord } from './form-product-helper';
import VariantTableRow from './VariantTableRow';
import { GLOABL_STATUS } from '../../../mock/global';
import { Empty } from '../../../components/empty-state';

type SelectVariantType = {
  form: UseFormReturnType<FormValues>;
  variantNames: VARIANTS_TYPE[];
  onCreateVariantNames: (query: string) => SelectItem | string | null | undefined;
  index: number;
};

const SelectVariant = (props: SelectVariantType) => {
  const { form, index, variantNames, onCreateVariantNames } = props;

  const [variant, setVariant] = useState<string[]>(DEFAULT_VARIANTS_TYPE);

  const handleChangeVariantType = (value: string[]) => {
    form.setFieldValue(`variants.${index}.values`, value);

    form.setValues((prev: Partial<FormValues>) => {
      const coords = getCoord(prev.variants?.[0]?.values || [], prev.variants?.[1]?.values || []);

      return {
        ...prev,
        type: prev.type,
        productVariants: coords?.map((coord) => ({
          coord,
          name: '',
          sku: '',
          price: '',
          price_purchase: '',
          price_wholesale: '',
          min_wholesale: 1,
          has_price_purchase: false,
          has_price_wholesale: false,
          has_variant_scale: false,
          variant_scale: 1,
          stock: 0,
          status: GLOABL_STATUS.ACTIVE,
          isPrimary: false,
        })),
      };
    });
  };

  return (
    <Group sx={{ alignItems: 'end' }}>
      <Select
        labelProps={{ mb: 8 }}
        mb={24}
        label="Tipe Varian"
        placeholder="Pilih Tipe Varian"
        data={variantNames}
        // searchable
        creatable
        withAsterisk
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
        withAsterisk
        labelProps={{ mb: 8 }}
        getCreateLabel={(query) => `+ Tambah "${query}"`}
        onCreate={(query) => {
          setVariant((current) => [...current, query]);
          return query;
        }}
        data={variant}
        {...form.getInputProps(`variants.${index}.values`)}
        onChange={handleChangeVariantType}
      />
    </Group>
  );
};

export default function AddProductVariant({ form }: { form: UseFormReturnType<FormValues> }) {
  const { variants, productVariants } = form.values;

  const [variantNames, setVariantNames] = useState<VARIANTS_TYPE[]>(DEFAULT_VARIANTS_TYPE_NAME);

  const handleCreateVariantNames = (query: string) => {
    const item = { value: query, label: query, disabled: false };
    setVariantNames((current) => [...current, item]);
    return query;
  };

  const rows = productVariants?.map((productVariant, idx) => {
    return (
      <VariantTableRow
        key={idx}
        totalVariant={productVariants?.length}
        coord={productVariant.coord}
        form={form}
        index={idx}
      />
    );
  });

  // const handleAddVariants = () => {
  //   form.setValues((prev) => ({ ...prev, variants: [...(prev.variants || []), DEFAULT_VARIANT] }));
  // };

  const handleAddNewVariant = () => {
    form.insertListItem('productVariants', {
      name: '',
      sku: '',
      price: '',
      price_purchase: '',
      price_wholesale: '',
      min_wholesale: 1,
      has_price_purchase: false,
      has_price_wholesale: false,
      has_variant_scale: false,
      variant_scale: 1,
      stock: 0,
      status: GLOABL_STATUS.ACTIVE,
      isPrimary: false,
    });
  };

  return (
    <>
      <div hidden>
        {variants?.map((_, idx) => {
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
      </div>

      <Title hidden order={6} my="md">
        Tabel Varian
      </Title>

      <Table sx={{ minWidth: 800 }} horizontalSpacing="xl" verticalSpacing="sm" striped withBorder>
        <thead>
          <tr>
            <th>Nama Varian</th>
            <th>Harga</th>
            <th>SKU</th>
            <th>Stock</th>
            <th>Produk Utama</th>
          </tr>
        </thead>
        <tbody>
          {rows}
          <tr>
            <td colSpan={5}>
              {rows?.length === 0 && (
                <Empty
                  title="Tidak Ada Varian"
                  label="Anda belum menambahkan Tipe Varian produk."
                />
              )}
            </td>
          </tr>
        </tbody>
      </Table>

      <Button mt="xl" onClick={handleAddNewVariant}>
        Tambah Varian Baru
      </Button>
    </>
  );
}
