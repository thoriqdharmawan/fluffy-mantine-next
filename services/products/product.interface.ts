interface Categories {
  id?: string;
  name: string;
  companyId: string;
}

export interface Variants {
  id?: number;
  name: string;
  values: any[];
}

export interface ProductVariants {
  id?: number;
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
