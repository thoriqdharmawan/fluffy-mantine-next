interface Categories {
  name: string;
  companyId: string;
}

interface Variants {
  name: string;
  values: any[];
}

interface ProductVariants {
  coord: number[];
  is_primary: boolean;
  price?: number;
  sku?: string;
  status?: string;
  stock?: number;
}

export interface AddProduct {
  name: string;
  image?: string;
  companyId: string;
  description?: string;
  type: string;
  categories?: Categories[];
  variants?: Variants[];
  product_variants?: ProductVariants[];
}
