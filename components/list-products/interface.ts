import { Dispatch, SetStateAction } from "react";

interface ParamChangePrice {
  open: boolean;
  id: string;
}

export interface Props {
  loading: boolean;
  loadingData: boolean;
  data: any;
  productType: string;
  refetch: () => void;
  handleDeleteProduct: (setLoading: Dispatch<SetStateAction<boolean>>, productId: string) => void;
  setChangePrice: (paramChangePrice: ParamChangePrice) => void;
  handleUpdateStatus: (productId: string, status: string) => void;
  page: number;
  totalPage: number;
  setPage: (number: number) => void;
}
