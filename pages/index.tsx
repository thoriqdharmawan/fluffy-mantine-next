import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box } from '@mantine/core';

import { GET_INCOMES } from '../services/homepage/Homepage.graphql';
import { convertToRupiah, getVariableDate } from '../context/helpers';

import MainLayout from '../layouts/MainLayout';
import Chips from '../components/chips/Chips';
import client from '../apollo-client';
import Incomes from '../modules/homepage/incomes';
import RecentTransactions from '../modules/homepage/recent-transaction';

import { useGlobal } from '../context/global';
import { useUser } from '../context/user';

export default function HomePage() {
  const { value } = useGlobal();
  const user = useUser();

  const companyId = value.selectedCompany || user.companyId;

  const [filter, setFilter] = useState<string>('NOW');

  const chips = useMemo(
    () => [
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
    ],
    [filter]
  );

  const { data, loading, error } = useQuery(GET_INCOMES, {
    client,
    skip: !companyId,
    fetchPolicy: 'network-only',
    variables: {
      ...getVariableDate(filter),
      companyId: companyId,
    },
  });

  if (error) {
    console.error(error);
  }

  const incomesData = useMemo(() => {
    const { count, sum } = data?.transactions_aggregate?.aggregate || {};

    return [
      {
        title: 'Pendapatan',
        value: convertToRupiah(sum?.total_amount || 0),
        description: 'Total uang yang didapatkan',
      },
      {
        title: 'Total Transaksi',
        value: count || 0,
        description: 'Total transaksi yang telah terjadi',
      },
    ];
  }, [data]);

  return (
    <MainLayout>
      <Box
        w="100%"
        sx={(theme) => ({
          padding: theme.spacing.lg,
          [theme.fn.smallerThan('sm')]: {
            padding: 0,
          },
        })}
      >
        <Chips data={chips} onChange={setFilter} />
        <Incomes data={incomesData} loading={loading || !companyId} />

        <RecentTransactions companyId={companyId} filter={filter} />
      </Box>
    </MainLayout>
  );
}
