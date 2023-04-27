import { useState } from 'react'
import { Button, Flex, Modal, Select, Text, Table, NumberInput, Title, Alert } from '@mantine/core'
import { IconChevronsRight, IconInfoCircle } from '@tabler/icons'

interface Props {
  opened: boolean;
  id: number | undefined;
  coord?: number[] | undefined;
  onClose: () => void;
}

interface TableProps {
  stock: number;
  transferedStock: number;
  resultStock: number;
  type?: string
}


const TableSwitch = ({ stock, transferedStock, resultStock, type }: TableProps) => {
  const isSubtraction = type === "SUBTRACTION"
  const sign = isSubtraction ? '-' : '+'

  return (
    <Table mb={24} highlightOnHover withBorder>
      <tbody>
        <tr>
          <td>Stok Awal</td>
          <td><Text ta="right">{stock}</Text></td>
        </tr>
        {transferedStock !== 0 && (
          <tr>
            <td>{isSubtraction ? 'Pengurangan' : 'Penambahan'}</td>
            <td><Text ta="right" color={isSubtraction ? "red" : "green"}>{sign} {transferedStock}</Text></td>
          </tr>
        )}
        <tr>
          <td>Stok Akhir</td>
          <td><Text ta="right">{resultStock}</Text></td>
        </tr>
      </tbody>
    </Table>
  )
}

export default function SwitchStock(props: Props) {
  const { opened, onClose, id } = props
  const [item, setItem] = useState<{ from: number }>({ from: 0 })
  // console.log("id : ", id)

  const SCALE_FROM = 1
  const SCALE_TO = 10
  const STOCK_FROM = 100
  const SOCK_TO = 100

  const data = {
    from: {
      scale: SCALE_FROM,
      stock: STOCK_FROM,
    },
    to: {
      scale: SCALE_TO,
      stock: SOCK_TO
    }
  }

  const handleChange = (value: number, type: string) => {
    setItem((prev) => ({ ...prev, [type]: value }))
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Bongkar Pasang Stock"
    >
      {id}
      <Flex
        justify="space-between"
        align="center"
        direction="row"
        gap="md"
        mb="xl"
      >
        <Select
          placeholder="Pilih Varian"
          data={[
            { value: 'Renceng', label: 'Renceng' },
            { value: 'Dus', label: 'Dus' },
          ]}
        />

        <IconChevronsRight />

        <Select
          placeholder="Pilih Varian"
          data={[
            { value: 'Renceng', label: 'Renceng' },
            { value: 'Dus', label: 'Dus' },
          ]}
        />
      </Flex>

      <Flex
        justify="space-between"
        align="center"
        direction="row"
        gap={50}
      >
        <Table mb={24} highlightOnHover withBorder>
          <tbody>
            <tr>
              <td>Skala</td>
              <td><Text ta="right">{data.from.scale}</Text></td>
            </tr>
          </tbody>
        </Table>
        <Table mb={24} highlightOnHover withBorder>
          <tbody>
            <tr>
              <td>Skala</td>
              <td><Text ta="right">{data.to.scale}</Text></td>
            </tr>
          </tbody>
        </Table>
      </Flex>

      <Alert icon={<IconInfoCircle size="1rem" />} title="Informasi" color="green" mb="md">
        Setiap 10 Renceng bertambah 1 Dus
      </Alert>

      <NumberInput
        mb={24}
        min={0}
        max={100}
        withAsterisk
        label="Stok yang di transfer"
        value={item.from}
        onChange={(v: number) => handleChange(v, 'from')}
        labelProps={{ mb: 8 }}
      />

      <Title order={6} mb="sm">Hasil</Title>

      <Flex gap={50}>
        <TableSwitch
          stock={100}
          transferedStock={Math.floor((item.from || 0) / 10) * 10}
          resultStock={100 - Math.floor((item.from || 0) / 10) * 10}
          type="SUBTRACTION"
        />
        <TableSwitch
          stock={100}
          transferedStock={Math.floor((item.from || 0) / 10)}
          resultStock={100 + Math.floor((item.from || 0) / 10)}
        />
      </Flex>

      <Flex
        justify="space-between"
        align="center"
        direction="row"
        gap="md"
        mt="xl"
      >

        <Button variant='subtle'>Batalkan</Button>
        <Button>Simpan</Button>
      </Flex>
    </Modal>
  )
}
