import React, { useMemo, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import Chips from '../../../components/chips/Chips';

import { createStyles, Title } from '@mantine/core';
import { getPreviousDays } from '../../../context/helpers';

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
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      show: true,
      borderWidth: 1,
    },
    xAxis: {
      type: 'category',
      data: getPreviousDays(),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [
          371,
          451.2,
          271.23,
          534,
          673,
          513,
          {
            value: 499,
            itemStyle: {
              color: '#0ca678',
            },
          },
        ],
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
