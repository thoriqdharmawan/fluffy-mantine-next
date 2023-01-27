import { Table, Button, Paper, Pagination, Group, Badge, ActionIcon  } from '@mantine/core';
import { TableListHistories } from '../../mock/orders-histories';
import {IconEye} from '@tabler/icons'

interface TableOrderHistoriesProps {
  data: TableListHistories[];
}

export function TableOrderHistories({ data }: TableOrderHistoriesProps) {
  const rows = data.map((row) => {
    return (
      <tr key={row.orderId}>
        <td>{row.orderId}</td>
        <td>{row.customerName}</td>
        <td>{row.dateAdded}</td>
        <td>{row.price}</td>
        <td>{row.cashier}</td>
        <td>
          <Badge color="green">{row.status}</Badge>
        </td>
        <td>
          <ActionIcon variant="light" color="primary"><IconEye size={16} /></ActionIcon>
        </td>
      </tr>
    );
  });

  return (
    <Paper shadow="sm" p="md" withBorder>
      <Table verticalSpacing="xs" striped>
        <thead>
          <tr>
            <th>Nomor Pesanan</th>
            <th>Nama Custormer</th>
            <th>Waktu Pemesanan</th>
            <th>Harga</th>
            <th>Kasir</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Group mt={24} mb={12}>
        <Pagination ml="auto" total={10} />
      </Group>
    </Paper>
  );
}
