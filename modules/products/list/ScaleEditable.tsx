import React, { useState } from 'react'
import { ActionIcon, Flex, NumberInput, Text } from '@mantine/core'
import { IconCheck, IconPencil, IconX } from '@tabler/icons';
import { useMutation } from '@apollo/client';
import { isNotEmpty, useForm } from '@mantine/form';

import { EDIT_PRODUCT_SCALE } from '../../../services/products';
import client from '../../../apollo-client';

interface Props {
  editable?: boolean;
  id?: number;
  scale: number | undefined;
  refetch: () => void;
}

export default function ScaleEditable(props: Props) {
  const { id, scale, editable = true, refetch } = props

  const [loading, setLoading] = useState<boolean>(false)
  const [editing, setEditing] = useState<boolean>(false)

  const form = useForm<{ scale: number }>({
    validate: {
      scale: isNotEmpty('Bagian ini diperlukan'),
    }
  })

  const [updateScale] = useMutation(EDIT_PRODUCT_SCALE, { client: client })

  const handleClose = () => {
    form.reset()
    setEditing(false)
  }

  const handleConfirm = () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      setLoading(true)
      updateScale({
        variables: {
          id: id,
          scale: form.values.scale
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
      ml="md"
    >
      {editing ? (
        <>
          <NumberInput maw={100} min={0} {...form.getInputProps('scale')} value={scale} />
          <ActionIcon onClick={() => setEditing(false)} color="red" variant="light" ml="sm">
            <IconX size={18} />
          </ActionIcon>
          <ActionIcon loading={loading} onClick={handleConfirm} color="blue" variant="light" ml="sm">
            <IconCheck size={18} />
          </ActionIcon>
        </>
      ) : (
        <>
          {scale}
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

