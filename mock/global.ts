import dayjs from "dayjs";

export interface GLOBAL_SELECT_TYPE {
  value: string;
  label: string;
}

export enum GLOABL_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const DEFAULT_CATEGORY = [
  {
    value: 'Makanan',
    label: 'Makanan',
  },
  {
    value: 'Minuman',
    label: 'Minuman',
  },
  {
    value: 'Pakaian',
    label: 'Pakaian',
  },
];


interface VariablesDate {
  [key: string]: {
    startdate: string,
    enddate: string
  }
}

const NowStart = dayjs(new Date().setHours(0, 0, 0)).subtract(7, 'hours')
const NowEnd = dayjs(new Date().setHours(23, 59, 59)).subtract(7, 'hours')
const FormatDate = 'YYYY-MM-DDTHH:mm:ss'

export const VARIABLES_DATE: VariablesDate = {
  'NOW': {
    startdate: NowStart.format(FormatDate),
    enddate: NowEnd.format(FormatDate)
  },
  'YESTERDAY': {
    startdate: NowStart.subtract(1, 'day').format(FormatDate),
    enddate: NowEnd.subtract(1, 'day').format(FormatDate)
  },
  'THISMONTH': {
    startdate: NowEnd.startOf('month').format(FormatDate),
    enddate: NowEnd.endOf('month').format(FormatDate)
  },
  'LAST30DAYS': {
    startdate: NowStart.subtract(30, 'days').format(FormatDate),
    enddate: NowEnd.format(FormatDate)
  },
  'ALL': {
    startdate: '',
    enddate: ''
  },
}