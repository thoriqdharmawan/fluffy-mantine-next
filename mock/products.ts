import { GLOABL_STATUS } from "./global";

interface VariantInterface {
  label: string;
  values: string[];
}
interface PriceInterface {
  min: number;
  max: number;
}

interface ProductsVariants {
  coord?: [number, number];
  sku: string;
  price: PriceInterface;
  stock: number;
  weight: number;
  status: GLOABL_STATUS;
  isPrimary: boolean;
}

export interface ProductsCardProps extends ProductsVariants {
  id: string;
  image: string;
  name: string;

  description?: string;
  category?: string[];

  hasVariants: boolean;
  variants?: VariantInterface[];
  prioductVariants?: ProductsVariants[];
}

export const PRODUCTS: ProductsCardProps[] = [
  {
    id: '123323',
    image:
      'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    name: 'Verudela Beach',
    sku: '1233d2312',
    price: {
      min: 100000,
      max: 150000,
    },
    stock: 100,
    weight: 10,
    status: GLOABL_STATUS.ACTIVE,
    isPrimary: false,

    description: 'Completely renovated for the season 2020, Arena Verudela.',
    category: ['Makanan', 'Minuman'],

    hasVariants: true,
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
    prioductVariants: [
      {
        coord: [0, 0],
        sku: 'PF21AS1',
        price: {
          min: 100000,
          max: 100000,
        },
        stock: 10,
        weight: 14,
        status: GLOABL_STATUS.ACTIVE,
        isPrimary: true,
      },
      {
        coord: [0, 1],
        sku: 'PF21AS2',
        price: {
          min: 100000,
          max: 100000,
        },
        stock: 10,
        weight: 14,
        status: GLOABL_STATUS.ACTIVE,
        isPrimary: false,
      },
      {
        coord: [1, 0],
        sku: 'PF21AS3',
        price: {
          min: 100000,
          max: 100000,
        },
        stock: 10,
        weight: 14,
        status: GLOABL_STATUS.ACTIVE,
        isPrimary: false,
      },
      {
        coord: [1, 1],
        sku: 'PF21AS4',
        price: {
          min: 100000,
          max: 100000,
        },
        stock: 10,
        weight: 14,
        status: GLOABL_STATUS.ACTIVE,
        isPrimary: false,
      },
      {
        coord: [2, 0],
        sku: 'PF21AS5',
        price: {
          min: 100000,
          max: 100000,
        },
        stock: 10,
        weight: 14,
        status: GLOABL_STATUS.ACTIVE,
        isPrimary: false,
      },
      {
        coord: [2, 1],
        sku: 'PF21AS6',
        price: {
          min: 100000,
          max: 150000,
        },
        stock: 10,
        weight: 14,
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
    sku: '1233d2312',
    price: {
      min: 200000,
      max: 200000,
    },
    stock: 100,
    weight: 10,
    status: GLOABL_STATUS.ACTIVE,
    isPrimary: true,

    description: 'Completely renovated for the season 2020, Arena Verudela.',
    category: ['Makanan', 'Minuman'],
    hasVariants: false,
  },
];
