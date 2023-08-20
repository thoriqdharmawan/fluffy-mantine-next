import { Dispatch, SetStateAction, useState, useEffect, useMemo } from 'react';
import { Button, Flex, Tabs } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconExclamationMark, IconList, IconLayoutGrid } from '@tabler/icons';
import { useMutation, useQuery } from '@apollo/client';

import ChangeProductPrices from './modal/ChangeProductPrices';
import ListProductTable from '../../../components/list-products/table';

import { useUser } from '../../../context/user';
import {
  deleteProduct,
  GET_LIST_PRODUCTS,
  UPDATE_STATUS_PRODUCT,
} from '../../../services/products';
import { useGlobal } from '../../../context/global';
import { LIST_VIEW_TYPES, PRODUCT_STATUS } from '../../../constant/global';
import client from '../../../apollo-client';
import ListProductCard from '../../../components/list-products/card';

type Props = {
  search: string;
};

const LIMIT = 5;

export default function ListProduct(props: Props) {
  const { value } = useGlobal();
  const { search } = props;
  const user = useUser();

  const companyId = value.selectedCompany || user.companyId;

  const [listViewType, setListViewType] = useState<string>(LIST_VIEW_TYPES.GRID);
  const [productType, setProductType] = useState<string>(PRODUCT_STATUS.ACTIVE);
  const [page, setPage] = useState<number>(1);
  const [changePrice, setChangePrice] = useState<{ open: boolean; id?: string }>({
    open: false,
    id: undefined,
  });

  const [updateStatus] = useMutation(UPDATE_STATUS_PRODUCT, { client });

  const { data, loading, error, refetch } = useQuery(GET_LIST_PRODUCTS, {
    client: client,
    skip: !companyId,
    // skip: true,
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: LIMIT,
      offset: (page - 1) * LIMIT,
      where: {
        _and: {
          status: { _eq: productType },
          company: { id: { _eq: companyId } },
          _or: search
            ? [{ product_variants: { sku: { _eq: search } } }, { name: { _ilike: `%${search}%` } }]
            : undefined,
        },
      },
    },
  });

  useEffect(() => setPage(1), [search, productType]);

  if (error) {
    console.error(error);
  }

  const handleDeleteProduct = (
    setLoading: Dispatch<SetStateAction<boolean>>,
    productId: string
  ) => {
    setLoading(true);

    deleteProduct(productId)
      .then(() => {
        refetch();
        showNotification({
          title: 'Yeayy, Berhasil Menghapus Produk!! 😊',
          message: 'Produk berhasil dihapus',
          icon: <IconCheck />,
          color: 'green',
        });
      })
      .catch(() => {
        showNotification({
          title: 'Gagal Menghapus Produk 🤥',
          message: 'Coba Lagi nanti',
          icon: <IconExclamationMark />,
          color: 'red',
        });
      })
      .finally(() => setLoading(false));
  };

  const loadingData = !companyId || loading;
  const totalPage = useMemo(() => Math.ceil((data?.total.aggregate.count || 0) / LIMIT), [data]);

  const handleUpdateStatus = (id: string, status: string) => {
    updateStatus({ variables: { id, status } })
      .then(() => {
        refetch();
        showNotification({
          title: 'Yeayy, Berhasil Mengubah Produk!! 😊',
          message: 'Produk berhasil dihapus',
          icon: <IconCheck />,
          color: 'green',
        });
      })
      .catch(() => {
        showNotification({
          title: 'Gagal Mengubah Produk 🤥',
          message: 'Coba Lagi nanti',
          icon: <IconExclamationMark />,
          color: 'red',
        });
      });
  };

  return (
    <>
      <Flex display="flex" justify="end" mb="sm">
        <Button.Group>
          <Button
            onClick={() => setListViewType(LIST_VIEW_TYPES.GRID)}
            size="xs"
            variant={listViewType === LIST_VIEW_TYPES.GRID ? 'filled' : 'default'}
          >
            <IconLayoutGrid size={18} />
          </Button>
          <Button
            onClick={() => setListViewType(LIST_VIEW_TYPES.TABLE)}
            size="xs"
            variant={listViewType === LIST_VIEW_TYPES.TABLE ? 'filled' : 'default'}
          >
            <IconList size={18} />
          </Button>
        </Button.Group>
      </Flex>

      <Tabs
        value={productType}
        onTabChange={(v) => setProductType(v || PRODUCT_STATUS.ACTIVE)}
        mb="lg"
      >
        <Tabs.List>
          <Tabs.Tab value={PRODUCT_STATUS.ACTIVE}>Produk Aktif</Tabs.Tab>
          <Tabs.Tab value={PRODUCT_STATUS.OPNAME}>Produk Opname</Tabs.Tab>
          <Tabs.Tab value={PRODUCT_STATUS.WAITING_FOR_APPROVAL}>Menunggu Persetujuan</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {listViewType === LIST_VIEW_TYPES.TABLE && (
        <ListProductTable
          loading={loading}
          loadingData={loadingData}
          data={data}
          productType={productType}
          refetch={refetch}
          handleDeleteProduct={handleDeleteProduct}
          setChangePrice={setChangePrice}
          handleUpdateStatus={handleUpdateStatus}
          page={page}
          totalPage={totalPage}
          setPage={setPage}
        />
      )}

      {listViewType === LIST_VIEW_TYPES.GRID && (
        <ListProductCard data={data} loading={loading} handleUpdateStatus={handleUpdateStatus} />
      )}

      <ChangeProductPrices
        opened={changePrice.open}
        id={changePrice.id}
        refetch={refetch}
        onClose={() => setChangePrice({ open: false, id: undefined })}
      />
    </>
  );
}
