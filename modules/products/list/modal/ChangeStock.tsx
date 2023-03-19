import React from 'react'
import { Button, Badge, Flex, Paper, Center, Modal, Image, Title, NumberInput, Switch } from '@mantine/core'

interface Props {
  opened: boolean;
  onClose: () => void;
}

export default function ChangeStock(props: Props) {
  const { opened, onClose } = props

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Sesuaikan Stok"
    >

      <Title order={3} my="lg" ta="center">Sesuaikan Stok</Title>

      

    </Modal>
  )
}
