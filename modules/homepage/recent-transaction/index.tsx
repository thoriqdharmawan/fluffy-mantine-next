import { useState, useMemo } from 'react'
import { Paper, Title, Table, Group, Pagination, ActionIcon } from '@mantine/core'
import { IconEye } from '@tabler/icons';
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs'

import { GLOBAL_FORMAT_DATE } from '../../../mock/global'
import { convertToRupiah, getVariableDate } from '../../../context/helpers'
import { GET_LIST_TRANSACTIONS } from '../../../services/homepage/Homepage.graphql';
import client from '../../../apollo-client';
import Loading from '../../../components/loading/Loading';
import { Empty } from '../../../components/empty-state';
import DetailTransaction from './detail';

const LIMIT = 10

interface Props {
  filter: string;
  companyId: string | undefined;
}
interface Detail {
  id: string | undefined;
  open: boolean;
}

export default function RecentTransactions({ filter, companyId }: Props) {

  const [page, setPage] = useState<number>(1)
  const [detail, setDetail] = useState<Detail>({
    id: undefined,
    open: false,
  })

  const date = useMemo(() => getVariableDate(filter), [filter])

  const { data, loading, error } = useQuery(GET_LIST_TRANSACTIONS, {
    client: client,
    skip: !companyId,
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: LIMIT,
      offset: (page - 1) * LIMIT,
      where: {
        companyId: companyId ? { _eq: companyId } : undefined,
        created_at: !!date.startdate && date.enddate ? { _gte: date.startdate, _lt: date.enddate } : undefined

      },
    },
  });

  if (error) {
    console.error(error);
  }

  const loadingData = !companyId || loading;
  const totalData = data?.total.aggregate.count || 0
  const totalPage = Math.ceil((totalData) / LIMIT);

  return (
    <>
      <Title order={6} mb="md">
        Riwayat Transaksi
      </Title>

      <Paper shadow="sm" p="md" withBorder w="100%">
        <Table verticalSpacing="xs" striped>

          <thead>
            <tr>
              <th>No</th>
              <th>Waktu Transaksi</th>
              <th>Total</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {!loadingData && (
              data?.transactions.map(({ id, code, created_at, total_amount }: any) => (
                <tr key={id}>
                  <td>{code}</td>
                  <td>{dayjs(created_at).format(GLOBAL_FORMAT_DATE)}</td>
                  <td>{convertToRupiah(total_amount)}</td>
                  <td>
                    <ActionIcon onClick={() => setDetail({ open: true, id })} variant="light" color="primary">
                      <IconEye size={16} />
                    </ActionIcon>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        {loadingData && <Loading />}
        {!loadingData && totalData === 0 && (
          <Empty
            title="Tidak Ada Transaksi"
            label="Belum ada transaksi yang terdaftar"
          />
        )}

        <Group mt={24} mb={12}>
          <Pagination m="auto" page={page} total={totalPage} onChange={setPage} />
        </Group>
      </Paper>

      <DetailTransaction
        opened={detail.open}
        id={detail.id}
        onClose={() => setDetail({ open: false, id: undefined })}
      />
    </>
  )
}
