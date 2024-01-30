import React, { useMemo, useState } from 'react';
import ReactEcharts from 'echarts-for-react';

import { createStyles, Title } from '@mantine/core';

import Chips from '../../../components/chips/Chips';

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
    marginTop: 24,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const ChartTransaction = () => {
  const { classes } = useStyles();

  const [filter, setFilter] = useState<string>('THIS_WEEK');

  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
  };

  const chips = useMemo(
    () => [
      {
        label: 'Minggu ini',
        value: 'THIS_WEEK',
        checked: filter === 'THIS_WEEK',
      },
      {
        label: 'Bulan ini',
        value: 'THIS_MONTH',
        checked: filter === 'THIS_MONTH',
      },
      {
        label: 'Tahun Ini',
        value: 'THIS_YEAR',
        checked: filter === 'THIS_YEAR',
      },
    ],
    [filter]
  );

  return (
    <div className={classes.root}>
      <Title order={6} mb="md">
        Grafik Penjualan
      </Title>

      <Chips data={chips} onChange={setFilter} />

      <ReactEcharts option={option} theme="light" />
    </div>
  );
};

export default ChartTransaction;
