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
  {
    value: 'Rasa',
    label: 'Rasa',
    disabled: false,
  },
];

export const DEFAULT_VARIANTS_TYPE: string[] = ['S', 'M', 'L', 'Manis', 'Pahit'];
