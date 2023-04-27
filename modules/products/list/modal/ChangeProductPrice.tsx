import React, { useState } from 'react'
import { Button, Flex, Paper,  Modal, NumberInput, Switch } from '@mantine/core'
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from '@mantine/form';

import { EDIT_PRODUCT_PRICE, GET_PRODUCT_VARIANT_PRICES_BY_ID } from '../../../../services/products';
import client from '../../../../apollo-client';

import Loading from '../../../../components/loading/Loading';

interface Props {
  opened: boolean;
  id?: number;
  onClose: () => void;
  refetch: () => void;
}

interface FormValues {
  price?: number;
  price_wholesale?: number,
  min_wholesale?: number,
  has_price_wholesale: boolean
}

export default function ChangeProductPrice(props: Props) {
  const { id, opened, onClose, refetch } = props
  const [loadingMutation, setLoadingMutation] = useState<boolean>(false)

  const form = useForm<FormValues>({
    initialValues: {
      price: undefined,
      price_wholesale: undefined,
      min_wholesale: undefined,
      has_price_wholesale: false
    },
    validate: {
      price: (value) => (!value ? 'Bagian ini diperlukan' : null),
      price_wholesale: (value, values) => {
        const isRequired = values.has_price_wholesale
        return (isRequired && !value) ? 'Bagian ini diperlukan' : null
      },
      min_wholesale: (value, values) => {
        const isRequired = values.has_price_wholesale
        return (isRequired && !value) ? 'Bagian ini diperlukan' : null
      },
    },
  })

  const [updatePrice] = useMutation(EDIT_PRODUCT_PRICE, { client: client })

  const { data, loading, error } = useQuery(GET_PRODUCT_VARIANT_PRICES_BY_ID, {
    client: client,
    skip: !id,
    fetchPolicy: 'cache-and-network',
    variables: { variant_id: id },
    onCompleted: (data) => {
      const { price, price_wholesale, min_wholesale } = data?.product_variants?.[0] || {}
      form.setValues((prev) => ({
        ...prev,
        price: price,
        price_wholesale: price_wholesale,
        min_wholesale: min_wholesale,
        has_price_wholesale: (price_wholesale && price) !== price_wholesale,
      }))
    }
  })

  if (error) {
    console.error(error)
  }

  const handleSubmit = async () => {
    setLoadingMutation(true)
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      const { has_price_wholesale, price_wholesale, price, min_wholesale } = form.values

      const priceWholesale = has_price_wholesale ? price_wholesale : price

      updatePrice({
        variables: {
          id,
          price: price,
          price_wholesale: priceWholesale,
          min_wholesale: min_wholesale,
        }
      }).then(() => {
        onClose()
        refetch()
      })
    }

    setLoadingMutation(false)
  }

  const { has_price_wholesale } = form.values || {}

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
          <Paper shadow="md" withBorder p="md" mb="xl">
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
              {...form.getInputProps(`price`)}
            />
            <Switch
              label="Tambahkan Harga Jual Grosir?"
              mb={24}
              checked={has_price_wholesale}
              {...form.getInputProps(`has_price_wholesale`)}
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
                {...form.getInputProps(`price_wholesale`)}
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
                {...form.getInputProps(`min_wholesale`)}
              />
            )}
          </Paper>
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
    </Modal >
  )
}
