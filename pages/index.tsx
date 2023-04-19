import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box } from '@mantine/core';

import { GET_INCOMES } from '../services/homepage/Homepage.graphql';
import { useUser } from '../context/user';
import { convertToRupiah, getVariableDate } from '../context/helpers';

import MainLayout from '../layouts/MainLayout';
import Chips from '../components/chips/Chips';
import client from '../apollo-client';
import Incomes from '../modules/homepage/incomes';
import RecentTransactions from '../modules/homepage/recent-transaction';
// import DatePicker from '../components/date/DatePicker';


export default function HomePage() {
  const user = useUser()

  const [filter, setFilter] = useState<string>('NOW')

  const chips = useMemo(() => [
    {
      label: 'Hari ini',
      value: 'NOW',
      checked: filter === 'NOW',
    },
    {
      label: 'Kemarin',
      value: 'YESTERDAY',
      checked: filter === 'YESTERDAY',
    },
    {
      label: 'Bulan ini',
      value: 'THISMONTH',
      checked: filter === 'THISMONTH',
    },
    {
      label: '30 Hari kebelakang',
      value: 'LAST30DAYS',
      checked: filter === 'LAST30DAYS',
    },
  ], [filter])

  const { data, loading, error } = useQuery(GET_INCOMES, {
    client: client,
    skip: !user.companyId,
    fetchPolicy: 'network-only',
    variables: {
      ...getVariableDate(filter),
      companyId: user.companyId
    }
  })

  if (error) {
    console.error(error)
  }

  const incomesData = useMemo(() => {
    const { count, sum } = data?.transactions_aggregate?.aggregate || {}

    return [
      {
        title: "Pendapatan",
        value: convertToRupiah(sum?.total_amount || 0),
        description: 'Total uang yang didapatkan'
      },
      {
        title: "Total Transaksi",
        value: count || 0,
        description: 'Total transaksi yang telah terjadi'
      },
    ]
  }, [data])


  return (
    <MainLayout>
      <Box p="lg" w="100%">

        {/* <DatePicker /> */}
        <Chips data={chips} onChange={setFilter} />
        <Incomes data={incomesData} loading={loading || !user.companyId} />

        <RecentTransactions filter={filter} />
        
      </Box>
    </MainLayout>
  );
}
