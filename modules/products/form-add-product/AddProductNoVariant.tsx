import { NumberInput, SimpleGrid, Switch, TextInput } from '@mantine/core';
import { type UseFormReturnType } from '@mantine/form';

import { FormValues } from '../../../pages/products/add';

export default function AddProductNoVariant({ form }: { form: UseFormReturnType<FormValues> }) {

  const { has_price_wholesale, has_price_purchase } = form.values?.productVariants?.[0] || {}

  return (
    <>
      <SimpleGrid cols={2} spacing="lg"
        breakpoints={[
          { maxWidth: 'sm', cols: 2, spacing: 'lg' },
          { maxWidth: 'xs', cols: 1, spacing: 'sm' },
        ]}>
        <div>
          <NumberInput
            hideControls
            label="Harga Jual"
            description="Harga yang ditampilkan untuk dijual"
            placeholder="Tambahkan Harga Jual"
            min={0}
            icon="Rp"
            labelProps={{ mb: 8 }}
            withAsterisk
            parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            formatter={(value: any) =>
              !Number.isNaN(parseFloat(value)) ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
            }
            {...form.getInputProps('productVariants.0.price')}
          />

          <Switch
            label="Tambahkan Harga Beli?"
            checked={form.values.productVariants?.[0].has_price_purchase}
            {...form.getInputProps('productVariants.0.has_price_purchase')}
          />
          <Switch
            label="Tambahkan Harga Jual Grosir?"
            mb={24}
            checked={form.values.productVariants?.[0].has_price_wholesale}
            {...form.getInputProps('productVariants.0.has_price_wholesale')}
          />
          {has_price_wholesale && (
            <NumberInput
              hideControls
              label="Harga Jual Grosir"
              description="Harga yang ditampilkan untuk dijual jika melakukan pembelian dalam jumlah tertentu"
              placeholder="Tambahkan Harga Jual Grosir"
              min={0}
              icon="Rp"
              labelProps={{ mb: 8 }}
              mb={24}
              withAsterisk
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              formatter={(value: any) =>
                !Number.isNaN(parseFloat(value)) ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
              }
              {...form.getInputProps('productVariants.0.price_wholesale')}
            />
          )}

          {has_price_wholesale && (
            <NumberInput
              label="Minimal Pembelian Grosir"
              description="Minimal pembelian untuk mendapatkan Harga Jual Grosir"
              placeholder="Tambahkan Minimal Pembelian Grosir"
              min={1}
              withAsterisk={has_price_wholesale}
              labelProps={{ mb: 8 }}
              mb={24}
              {...form.getInputProps('productVariants.0.min_wholesale')}
            />
          )}

          <TextInput
            label="SKU"
            description="Kode unik produk"
            placeholder="Tambahkan SKU"
            labelProps={{ mb: 8 }}
            // withAsterisk
            mb={24}
            {...form.getInputProps('productVariants.0.sku')}
          />

          <NumberInput
            label="Stok"
            description="Stok produk tersedia"
            placeholder="Tambahkan Stok"
            // withAsterisk
            labelProps={{ mb: 8 }}
            mb={24}
            {...form.getInputProps('productVariants.0.stock')}
          />
        </div>

        <div>
          {has_price_purchase && (
            <NumberInput
              hideControls
              label="Harga Beli"
              description="Modal suatu produk (data ini diperlukan jika ingin mendapatkan statistik keuntungan penjualan)"
              placeholder="Tambahkan Harga Beli"
              min={0}
              icon="Rp"
              labelProps={{ mb: 8 }}
              withAsterisk={has_price_purchase}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              formatter={(value: any) =>
                !Number.isNaN(parseFloat(value)) ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
              }
              {...form.getInputProps('productVariants.0.price_purchase')}
            />
          )}
        </div>
      </SimpleGrid>

    </>
  );
}
