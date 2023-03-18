import React, { useState } from 'react'
import { Button, Badge, Flex, Paper, Center, Modal, Image, Title, NumberInput, Switch } from '@mantine/core'
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from '@mantine/form';

import { EDIT_PRODUCT_PRICES, GET_PRODUCT_PRICES_BY_ID } from '../../../../services/products';
import { getVariants } from '../../../../context/helpers';
import client from '../../../../apollo-client';

import Loading from '../../../../components/loading/Loading';

interface Props {
  opened: boolean;
  id?: string;
  onClose: () => void;
  refetch: () => void;
}

interface pv {
  price?: number;
  price_wholesale?: number,
  min_wholesale?: number,
  has_price_wholesale: boolean
}

interface FormValues {
  productVariants: pv[]
}

export default function ChangeProductPrices(props: Props) {
  const { id, opened, onClose, refetch } = props
  const [loadingMutation, setLoadingMutation] = useState<boolean>(false)

  const form = useForm<FormValues>({
    initialValues: {
      productVariants: [
        {
          price: undefined,
          price_wholesale: undefined,
          min_wholesale: undefined,
          has_price_wholesale: false
        },
      ],
    },
    validate: {
      productVariants: {
        price: (value) => (!value ? 'Bagian ini diperlukan' : null),
        price_wholesale: (value, values, path) => {
          const index: number = Number(path.split('.')[1] || 0)
          const isRequired = values.productVariants?.[index]?.has_price_wholesale
          return (isRequired && !value) ? 'Bagian ini diperlukan' : null
        },
        min_wholesale: (value, values, path) => {
          const index: number = Number(path.split('.')[1] || 0)
          const isRequired = values.productVariants?.[index]?.has_price_wholesale
          return (isRequired && !value) ? 'Bagian ini diperlukan' : null
        },
      },
    },
  })

  const [updatePrices] = useMutation(EDIT_PRODUCT_PRICES, { client: client })

  const { data, loading, error } = useQuery(GET_PRODUCT_PRICES_BY_ID, {
    client: client,
    skip: !id,
    fetchPolicy: 'cache-and-network',
    variables: {
      product_id: id
    },
    onCompleted: (data) => {
      const { product_variants } = data.products?.[0] || {};

      form.setValues((prev) => ({
        ...prev,
        productVariants: product_variants?.map((product: any) => {
          const { price, price_purchase, price_wholesale, min_wholesale } = product

          return {
            id: product.id,
            coord: product.coord,
            sku: product.sku,
            price: price,
            price_purchase: price_purchase,
            price_wholesale: price_wholesale,
            min_wholesale: product.min_wholesale,
            stock: product.stock,
            status: product.status,
            isPrimary: product.is_primary,
            has_price_purchase: (price_purchase && price) !== price_purchase,
            has_price_wholesale: (price_wholesale && price) !== price_wholesale,
          }
        }),
      }))
    }
  })

  if (error) {
    console.error(error)
  }

  const { image, name, type, variants, product_variants } = data?.products?.[0] || {}


  const handleSubmit = async () => {
    setLoadingMutation(true)
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      updatePrices({
        variables: {
          id,
          product_variants: form.values.productVariants?.map((product_variant: any) => {
            const { has_price_purchase, has_price_wholesale, price_purchase, price_wholesale, price } = product_variant

            const pricePurchase = has_price_purchase ? price_purchase : price
            const priceWholesale = has_price_wholesale ? price_wholesale : price
            
            return {
              coord: product_variant.coord,
              is_primary: product_variant.isPrimary,
              price: product_variant.price,
              price_purchase: pricePurchase,
              price_wholesale: priceWholesale,
              min_wholesale: product_variant.min_wholesale || 1,
              sku: product_variant.sku,
              status: product_variant.status,
              stock: product_variant.stock,
              productId: id,
            }
          })
        }
      }).then(() => {
        refetch()
        onClose()
      })
    }

    setLoadingMutation(false)
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Ubah Harga Produk"
    >
      {loading && (
        <Loading />
      )}
      {!loading && data && (
        <>
          <Center>
            <Image maw={240} mx="auto" radius="md" src={image} alt={name} />
          </Center>

          <Title order={3} my="lg" ta="center">{name}</Title>

          {product_variants?.map((pv: any, index: number) => {

            const { has_price_wholesale } = form.values?.productVariants?.[index] || {}

            return (
              <Paper shadow="md" withBorder p="md" mb="xl" key={pv.id}>
                {type === "VARIANT" && (
                  <Badge sx={{ textTransform: 'none' }} color="teal" mb="md">
                    {getVariants(variants, pv.coord)}
                  </Badge>
                )}
                <NumberInput
                  hideControls
                  label="Harga Jual"
                  placeholder="Tambahkan Harga Jual"
                  min={0}
                  icon="Rp"
                  labelProps={{ mb: 8 }}
                  mb="lg"
                  withAsterisk
                  parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                  formatter={(value: any) =>
                    !Number.isNaN(parseFloat(value)) ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
                  }
                  {...form.getInputProps(`productVariants.${index}.price`)}
                />
                <Switch
                  label="Tambahkan Harga Jual Grosir?"
                  mb={24}
                  checked={has_price_wholesale}
                  {...form.getInputProps(`productVariants.${index}.has_price_wholesale`)}
                />
                {has_price_wholesale && (
                  <NumberInput
                    hideControls
                    label="Harga Jual Grosir"
                    placeholder="Tambahkan Harga Jual"
                    min={0}
                    icon="Rp"
                    labelProps={{ mb: 8 }}
                    mb="lg"
                    withAsterisk
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
                    min={0}
                    labelProps={{ mb: 8 }}
                    mb="lg"
                    withAsterisk={has_price_wholesale}
                    {...form.getInputProps(`productVariants.${index}.min_wholesale`)}
                  />
                )}
              </Paper>
            )
          })}

          <Flex
            justify="space-between"
            align="center"
            direction="row"
            wrap="wrap"
            mt="xl"
          >
            <Button disabled={loadingMutation} onClick={onClose} variant='subtle'>Batal</Button>
            <Button disabled={loadingMutation} onClick={handleSubmit}>Simpan</Button>
          </Flex>
        </>
      )}
    </Modal>
  )
}
