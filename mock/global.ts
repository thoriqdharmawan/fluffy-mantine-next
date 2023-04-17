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

const Now = dayjs(new Date())
const FormatDate = 'YYYY-MM-DD'

export const VARIABLES_DATE: VariablesDate = {
  'NOW': {
    startdate: Now.format(FormatDate),
    enddate: Now.add(1, 'day').format(FormatDate)
  },
  'YESTERDAY': {
    startdate: Now.subtract(1, 'day').format(FormatDate),
    enddate: Now.format(FormatDate)
  },
  'THISMONTH': {
    startdate: Now.startOf('month').format(FormatDate),
    enddate: Now.endOf('month').format(FormatDate)
  },
  'LAST30DAYS': {
    startdate: Now.subtract(30, 'days').format(FormatDate),
    enddate: Now.format(FormatDate)
  },
}