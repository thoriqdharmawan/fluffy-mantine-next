import { useState, useEffect, useMemo } from 'react';
import { ActionIcon, Flex, Box, Text, Table, NumberInput, Switch, TextInput } from '@mantine/core';
import { convertToRupiah } from '../../context/helpers';
import { IconCheck, IconEdit, IconTrash, IconX } from '@tabler/icons';
import { TableProductsVariants } from '../../mock/products';
import { useForm } from '@mantine/form';
import { useMutation } from '@apollo/client';
import {
  ADD_PRODUCT_VARIANT,
  DELETE_PRODUCT_VARIANT,
  UPDATE_PRODUCT_VARIANT,
} from '../../services/products';
import client from '../../apollo-client';

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
  product?: any;
  productVariant?: any;
  refetch: () => void;
  type?: string;
  onClose?: () => void;
}

interface FormValues extends TableProductsVariants {}

export default function DetailProductVariant(props: Props) {
  const { product, productVariant, refetch, type = 'VIEW', onClose } = props;

  const [editing, setEditing] = useState<boolean>(type === 'ADD');
  const [loading, setLoading] = useState<boolean>(false);

  const [updateProductVariant] = useMutation(UPDATE_PRODUCT_VARIANT, { client });
  const [deleteProductVariant] = useMutation(DELETE_PRODUCT_VARIANT, { client });
  const [addProductVariant] = useMutation(ADD_PRODUCT_VARIANT, { client });

  const INITIAL_VALUE = {
    name: productVariant?.name,
    price: productVariant?.price,
    has_price_wholesale: productVariant?.has_price_wholesale !== productVariant?.price,
    price_wholesale: productVariant?.price_wholesale,
    min_wholesale: productVariant?.min_wholesale,
    stock: productVariant?.stock,
    has_variant_scale: (productVariant?.has_variant_scale || 1) > 1,
    variant_scale: productVariant?.scale,
    sku: productVariant?.sku,
  };

  const form = useForm<FormValues>({
    initialValues: INITIAL_VALUE,
    validate: {
      name: (value) => (!value ? 'Bagian ini diperlukan' : null),
      price: (value) => (!value ? 'Bagian ini diperlukan' : null),
      price_wholesale: (value, values) => {
        const isRequired = values.has_price_wholesale;
        return isRequired && !value ? 'Bagian ini diperlukan' : null;
      },
      min_wholesale: (value, values) => {
        const isRequired = values.has_price_wholesale;
        return isRequired && !value ? 'Bagian ini diperlukan' : null;
      },
    },
  });

  useEffect(() => {
    const { price, price_wholesale, scale } = productVariant || {};
    form.setValues({
      has_price_wholesale: (price_wholesale && price) !== price_wholesale,
      has_variant_scale: (scale || 0) > 1,
    });
  }, [productVariant, editing]);

  const toggleEditing = () => setEditing((prev) => !prev);

  const handleSubmit = () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      setLoading(true);
      const {
        name,
        price,
        price_wholesale,
        min_wholesale,
        has_price_wholesale,
        variant_scale,
        stock,
        sku,
      } = form.values;

      const priceWholesale = has_price_wholesale ? price_wholesale : price;

      const mutate =
        type === 'ADD'
          ? addProductVariant({
              variables: {
                objects: [
                  {
                    productId: product?.id,
                    name: name,
                    price: price,
                    min_wholesale: min_wholesale,
                    price_wholesale: priceWholesale,
                    scale: variant_scale || 1,
                    stock: stock || 0,
                    sku: sku,
                    status: 'ACTIVE',
                    is_primary: false,
                  },
                ],
              },
            })
          : updateProductVariant({
              variables: {
                id: productVariant?.id,
                name: name,
                price: price,
                min_wholesale: min_wholesale,
                price_wholesale: priceWholesale,
                scale: variant_scale || 1,
                stock: stock || 0,
                sku: sku,
              },
            });

      mutate
        .then(({ data }) => {
          const { min_wholesale, name, price, price_wholesale, scale, stock, sku } =
            data?.mutate?.returning?.[0];

          form.setValues({
            name,
            price,
            price_wholesale,
            min_wholesale,
            stock,
            variant_scale: scale,
            sku,
          });
          refetch();
          setEditing(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleCloseEditing = () => {
    if (onClose) {
      onClose();
      return;
    }

    form.setValues(INITIAL_VALUE);
    toggleEditing();
  };

  const handleDeleteVariant = () => {
    deleteProductVariant({
      variables: {
        id: productVariant?.id,
      },
    }).then(() => {
      refetch();
    });
  };

  return (
    <Box
      p="sm"
      mb="xl"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
      })}
    >
      {editing ? (
        <TextInput placeholder="Tambahkan Nama Varian" mb="md" {...form.getInputProps(`name`)} />
      ) : (
        <Text fw={700} fz="md">
          {form?.values?.name || '-'}
        </Text>
      )}
      <Flex mb="sm" align="center">
        <Text mr="xs">SKU: </Text>
        {editing ? (
          <TextInput
            placeholder="Tambahkan SKU"
            labelProps={{ mb: 8 }}
            {...form.getInputProps(`sku`)}
          />
        ) : (
          <Text>{form?.values?.sku || '-'}</Text>
        )}
      </Flex>

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
                convertToRupiah(form?.values?.price || 0) || '-'
              )
            }
          />
          {(form?.values?.price !== form?.values?.price_wholesale || editing) && (
            <>
              {form.values.has_price_wholesale && (
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
                      convertToRupiah(form?.values?.price_wholesale || 0) || '-'
                    )
                  }
                />
              )}

              {form.values.has_price_wholesale && (
                <ItemRow
                  label="Minimal Grosir"
                  value={
                    editing ? (
                      <NumberInput
                        min={1}
                        ta="right"
                        withAsterisk
                        placeholder="Tambahkan Minimal Pembelian Grosir"
                        {...form.getInputProps(`min_wholesale`)}
                      />
                    ) : (
                      form?.values?.min_wholesale || '-'
                    )
                  }
                />
              )}
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
                form?.values?.stock || '0'
              )
            }
          />
          <ItemRow
            label="Skala"
            value={
              editing ? (
                <NumberInput
                  ta="right"
                  min={1}
                  step={1}
                  placeholder="Tambahkan Skala"
                  {...form.getInputProps(`variant_scale`)}
                />
              ) : (
                form?.values?.variant_scale || '1'
              )
            }
          />
        </tbody>
      </Table>

      {editing && (
        <Flex mb="md" direction="column">
          <Switch
            label="Tambahkan Harga Jual Grosir?"
            checked={form.values.has_price_wholesale}
            {...form.getInputProps(`has_price_wholesale`)}
          />

          {/* <Switch
            label="Tambahkan Skala Varian?"
            checked={form.values.has_variant_scale}
            {...form.getInputProps(`has_variant_scale`)}
          /> */}
        </Flex>
      )}

      {editing ? (
        <Flex mt="lg" justify="end" gap="xs">
          <ActionIcon disabled={loading} onClick={handleCloseEditing} variant="default" color="red">
            <IconX size="1.125rem" />
          </ActionIcon>
          <ActionIcon disabled={loading} onClick={handleSubmit} variant="filled" color="blue">
            <IconCheck size="1.125rem" />
          </ActionIcon>
        </Flex>
      ) : (
        <Flex mt="lg" justify="space-between">
          <ActionIcon onClick={handleDeleteVariant} variant="light" color="red">
            <IconTrash size="1.125rem" />
          </ActionIcon>
          <ActionIcon onClick={toggleEditing} variant="filled" color="blue">
            <IconEdit size="1.125rem" />
          </ActionIcon>
        </Flex>
      )}
    </Box>
  );
}
