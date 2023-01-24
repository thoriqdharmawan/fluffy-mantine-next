export interface VARIANTS_TYPE {
  value: string;
  label: string;
  disabled?: boolean;
}

export const DEFAULT_VARIANTS_TYPE_NAME: VARIANTS_TYPE[] = [
  {
    value: 'Ukuran',
    label: 'Ukuran',
    disabled: false,
  },
  {
    value: 'Bahan',
    label: 'Bahan',
    disabled: false,
  },
  {
    value: 'Warna',
    label: 'Warna',
    disabled: false,
  },
];

export const DEFAULT_VARIANTS_TYPE: VARIANTS_TYPE[] = [
  {
    value: 'S',
    label: 'S',
  },
  {
    value: 'M',
    label: 'M',
  },
  {
    value: 'L',
    label: 'L',
  },
];
