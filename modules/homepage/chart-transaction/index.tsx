import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';

import { createStyles, Title } from '@mantine/core';
import { getPreviousDays, getVariableChartTransction } from '../../../context/helpers';
import { DEFAULT_CHART_OPTIONS, MAPPING_NUMBER } from '../../../constant/global';
import { useQuery } from '@apollo/client';
import { GET_CHART_TRANSACTION } from '../../../services/homepage/Homepage.graphql';

import client from '../../../apollo-client';

interface Props {
  companyId: String;
}

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
    marginBottom: 24,
  },
  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  chartContainer: {
    marginTop: -53,
  },
}));

const ChartTransaction = (props: Props) => {
  const { companyId } = props;
  const { classes } = useStyles();

  const { data, loading, error } = useQuery(GET_CHART_TRANSACTION, {
    client,
    skip: !companyId,
    fetchPolicy: 'cache-first',
    variables: {
      ...getVariableChartTransction(),
      companyId: companyId,
    },
  });

  if (error) {
    console.error(error);
  }

  const option = useMemo(() => {
    const dataSeries: number[] = MAPPING_NUMBER.map(
      (number: string) => data?.[number]?.aggregate.sum.total_amount || 0
    );
    return {
      ...DEFAULT_CHART_OPTIONS,
      xAxis: {
        type: 'category',
        data: getPreviousDays(),
        show: true,
      },
      yAxis: {
        ...DEFAULT_CHART_OPTIONS.yAxis,
        max: Math.max(...dataSeries),
      },
      series: [
        {
          data: dataSeries,
          type: 'bar',
        },
      ],
    };
  }, [data]);

  return (
    <div className={classes.root}>
      <Title order={6} mb="md">
        Grafik Penjualan 7 Hari Kebelakang
      </Title>

      <div className={classes.chartContainer}>
        <ReactEcharts showLoading={loading || !data} option={option} theme="light" />
      </div>
    </div>
  );
};

export default ChartTransaction;
