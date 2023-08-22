import { useState } from 'react';
import { ActionIcon, Flex, Box, Text, Table, NumberInput } from '@mantine/core';
import { convertToRupiah } from '../../context/helpers';
import { IconCheck, IconEdit, IconX } from '@tabler/icons';
import { TableProductsVariants } from '../../mock/products';
import { useForm } from '@mantine/form';

const ItemRow = (props: { label: string; value: any }) => {
  const { label, value } = props;

  return (
    <tr>
      <td>{label}</td>
      <td>
        <Text ta="right">{value}</Text>
      </td>
    </tr>
  );
};

interface Props {
  product: any;
  productVariant: any;
}

interface FormValues extends TableProductsVariants {}

// id?: number;
// coord?: number[];
// sku?: string;
// price?: number | string;
// price_purchase?: number | string;
// price_wholesale?: number | string;
// min_wholesale?: number;
// has_price_purchase?: boolean;
// has_price_wholesale?: boolean;
// has_variant_scale?: boolean;
// variant_scale?: number;
// stock?: number | undefined;
// status?: GLOABL_STATUS;
// isPrimary?: boolean;

export default function DetailProductVariant(props: Props) {
  const [editing, setEditing] = useState<boolean>(false);
  const { product, productVariant } = props;
  const { variants } = product;
  const { coord } = productVariant;

  const form = useForm<FormValues>({
    initialValues: {
      price: productVariant.price,
      price_wholesale: productVariant.price_wholesale,
      min_wholesale: productVariant.min_wholesale,
      stock: productVariant.stock,
      variant_scale: productVariant.scale,
    },

    validate: {
      price: (value) => (!value ? 'Bagian ini diperlukan' : null),
      // price_wholesale: (value, values, path) => {
      //   const index: number = Number(path.split('.')[1] || 0);
      //   const isRequired = has_price_wholesale;
      //   return isRequired && !value ? 'Bagian ini diperlukan' : null;
      // },
      // min_wholesale: (value, values, path) => {
      //   const index: number = Number(path.split('.')[1] || 0);
      //   const isRequired = has_price_wholesale;
      //   return isRequired && !value ? 'Bagian ini diperlukan' : null;
      // },
      // variant_scale: (value, values, path) => {
      //   const index: number = Number(path.split('.')[1] || 0);
      //   const isRequired = has_variant_scale;
      //   return isRequired && !value ? 'Bagian ini diperlukan' : null;
      // },
    },
  });

  const variant1 = variants?.[0]?.values[coord[0]] || null;
  const variant2 = variants?.[1]?.values[coord[1]] || null;
  return (
    <Box
      p="sm"
      mb="xl"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
      })}
    >
      <Text fw={700} fz="md">
        {[variant1, variant2].filter((data) => data).join(' | ')}
      </Text>
      <Text mb="sm">SKU: {productVariant.sku || '-'}</Text>

      <Table mt="md" withBorder>
        <tbody>
          <ItemRow
            label="Harga Jual"
            value={
              editing ? (
                <NumberInput
                  min={0}
                  icon="Rp"
                  ta="right"
                  withAsterisk
                  hideControls
                  placeholder="Tambahkan Harga Jual"
                  parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                  formatter={(value: any) =>
                    !Number.isNaN(parseFloat(value))
                      ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      : ''
                  }
                  {...form.getInputProps(`price`)}
                />
              ) : (
                convertToRupiah(productVariant.price) || '-'
              )
            }
          />
          {productVariant.price !== productVariant.price_wholesale && (
            <>
              <ItemRow
                label="Harga Grosir"
                value={
                  editing ? (
                    <NumberInput
                      min={0}
                      icon="Rp"
                      ta="right"
                      withAsterisk
                      hideControls
                      placeholder="Tambahkan Harga Grosir"
                      parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                      formatter={(value: any) =>
                        !Number.isNaN(parseFloat(value))
                          ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : ''
                      }
                      {...form.getInputProps(`price_wholesale`)}
                    />
                  ) : (
                    convertToRupiah(productVariant.price_wholesale) || '-'
                  )
                }
              />
              <ItemRow
                label="Minimal Grosir"
                value={
                  editing ? (
                    <NumberInput
                      min={1}
                      ta="right"
                      withAsterisk
                      hideControls
                      placeholder="Tambahkan Minimal Pembelian Grosir"
                      {...form.getInputProps(`min_wholesale`)}
                    />
                  ) : (
                    productVariant.min_wholesale || '-'
                  )
                }
              />
            </>
          )}
          <ItemRow
            label="Stok"
            value={
              editing ? (
                <NumberInput
                  ta="right"
                  min={0}
                  placeholder="Tambahkan Stok Produk"
                  {...form.getInputProps(`stock`)}
                />
              ) : (
                productVariant.stock || '0'
              )
            }
          />
          <ItemRow
            label="Skala"
            value={
              editing ? (
                <NumberInput
                  ta="right"
                  withAsterisk
                  hideControls
                  min={1}
                  step={1}
                  placeholder="Tambahkan Skala"
                  {...form.getInputProps(`variant_scale`)}
                />
              ) : (
                productVariant.scale || '1'
              )
            }
          />
        </tbody>
      </Table>

      {editing ? (
        <Flex mt="lg" justify="end" gap="xs">
          <ActionIcon onClick={() => setEditing((prev) => !prev)} variant="default" color="red">
            <IconX size="1.125rem" />
          </ActionIcon>
          <ActionIcon onClick={() => setEditing((prev) => !prev)} variant="filled" color="blue">
            <IconCheck size="1.125rem" />
          </ActionIcon>
        </Flex>
      ) : (
        <Flex mt="lg" justify="end">
          <ActionIcon onClick={() => setEditing((prev) => !prev)} variant="filled" color="blue">
            <IconEdit size="1.125rem" />
          </ActionIcon>
        </Flex>
      )}
    </Box>
  );
}
