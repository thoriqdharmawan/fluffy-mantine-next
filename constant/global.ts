export const PRODUCT_STATUS = {
  WAITING_FOR_APPROVAL: 'WAITING_FOR_APPROVAL',
  ACTIVE: 'ACTIVE',
  REJECT: 'REJECT',
  OPNAME: 'OPNAME',
  DELETE: 'DELETE',
};

export const LIST_VIEW_TYPES = {
  TABLE: 'TABLE',
  GRID: 'GRID',
};

export const DEFAULT_CHART_OPTIONS = {
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
  yAxis: {
    type: 'value',
  },
};
