import React, { useState } from 'react'
import { ActionIcon, Flex, TextInput } from '@mantine/core'
import { IconCheck, IconPencil, IconX } from '@tabler/icons';
import { useMutation } from '@apollo/client';
import { isNotEmpty, useForm } from '@mantine/form';

import { EDIT_SKU_STOCK } from '../../../services/products';
import client from '../../../apollo-client';

interface Props {
  editable?: boolean;
  id?: number;
  sku: string | undefined;
  refetch: () => void;
}

export default function SkuEditable(props: Props) {
  const { id, sku, editable = true, refetch } = props

  const [loading, setLoading] = useState<boolean>(false)
  const [editing, setEditing] = useState<boolean>(false)

  const form = useForm<{ sku: string | undefined }>({
    validate: {
      sku: isNotEmpty('Bagian ini diperlukan'),
    },
    initialValues: {
      sku
    }
  })

  const [updateSku] = useMutation(EDIT_SKU_STOCK, { client: client })

  const handleClose = () => {
    form.reset()
    setEditing(false)
  }

  const handleConfirm = () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      setLoading(true)
      updateSku({
        variables: {
          id: id,
          sku: form.values.sku
        }
      }).then(() => {
        refetch()
      }).finally(() => {
        handleClose()
        setLoading(false)
      })
    }
  }

  return (
    <Flex
      align="center"
      direction="row"
    >
      {editing ? (
        <>
          <TextInput {...form.getInputProps('sku')} value={form.values.sku} />
          <ActionIcon onClick={handleClose} color="red" variant="light" ml="sm">
            <IconX size={18} />
          </ActionIcon>
          <ActionIcon loading={loading} onClick={handleConfirm} color="blue" variant="light" ml="sm">
            <IconCheck size={18} />
          </ActionIcon>
        </>
      ) : (
        <>
          {sku || '-'}
          {editable && (
            <ActionIcon hidden={!editable} onClick={() => setEditing(true)} color="blue" variant="light" ml="md">
              <IconPencil size={18} />
            </ActionIcon>
          )}
        </>
      )}
    </Flex>
  )
}

