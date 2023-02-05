import { GLOABL_STATUS } from './global';

export interface VariantInterface {
  label: string | undefined;
  values: string[] | [];
}

export interface TableProductsVariants {
  coord?: number[];
  sku?: string;
  price?: number;
  stock?: number | undefined;
  status?: GLOABL_STATUS;
  isPrimary?: boolean;
}

export declare type ProductType = 'VARIANT' | 'NOVARIANT';

export interface ProductsCardProps {
  id?: string;
  image: string | undefined;
  name: string;

  description?: string;
  categories?: string[];

  type: ProductType;
  variants?: VariantInterface[] | [];
  productVariants?: TableProductsVariants[] | undefined;
}

export const DEFAULT_PRODUCT_CATEGORIES = ['Makanan', 'Minuman', 'Pakaian'];

export const PRODUCTS: ProductsCardProps[] = [
  {
    id: '123323',
    image:
      'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    name: 'Verudela Beach',

    description: 'Completely renovated for the season 2020, Arena Verudela.',
    categories: ['Makanan', 'Minuman'],

    type: 'VARIANT',
    variants: [
      {
        label: 'Ukuran',
        values: ['S', 'M', 'L'],
      },
      {
        label: 'Warna',
        values: ['Hitam', 'Biru'],
      },
    ],
    productVariants: [
      {
        coord: [0, 0],
        sku: 'PF21AS1',
        price: 100000,
        stock: 10,
        status: GLOABL_STATUS.ACTIVE,
        isPrimary: true,
      },
      {
        coord: [0, 1],
        sku: 'PF21AS2',
        price: 13344,
        stock: 10,
        status: GLOABL_STATUS.ACTIVE,
        isPrimary: false,
      },
      {
        coord: [1, 0],
        sku: 'PF21AS3',
        price: 100000,
        stock: 10,
        status: GLOABL_STATUS.ACTIVE,
        isPrimary: false,
      },
      {
        coord: [1, 1],
        sku: 'PF21AS4',
        price: 100000,
        stock: 10,
        status: GLOABL_STATUS.ACTIVE,
        isPrimary: false,
      },
      {
        coord: [2, 0],
        sku: 'PF21AS5',
        price: 100000,
        stock: 10,
        status: GLOABL_STATUS.ACTIVE,
        isPrimary: false,
      },
      {
        coord: [2, 1],
        sku: 'PF21AS6',
        price: 150000,
        stock: 10,
        status: GLOABL_STATUS.ACTIVE,
        isPrimary: false,
      },
    ],
  },
  {
    id: '123323',
    image:
      'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    name: 'Verudela Beach',

    description: 'Completely renovated for the season 2020, Arena Verudela.',
    categories: ['Makanan', 'Minuman'],
    type: 'VARIANT',
  },
];
