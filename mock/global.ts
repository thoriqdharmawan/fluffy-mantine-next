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
