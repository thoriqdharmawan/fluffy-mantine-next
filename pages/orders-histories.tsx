import React from 'react'

import MainLayout from '../layouts/MainLayout';

import { TableOrderHistories } from '../modules/orders-histories/TableOrdersHistories';

import { ORDER_HISTORIES_DATA } from '../mock/orders-histories';

export default function OrdersHistories() {
  return (
    <MainLayout>
      <TableOrderHistories data={ORDER_HISTORIES_DATA} />
    </MainLayout>
  )
}
