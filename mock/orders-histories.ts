export interface TableListHistories {
  orderId: string;
  customerName: string;
  dateAdded: string;
  price: number;
  status: string;
  cashier: string;
}

export const ORDER_HISTORIES_DATA = [
  {
    orderId: '#00010',
    customerName: 'Andi',
    dateAdded: '12-12-2023',
    price: 12000,
    status: 'COMPLETED',
    cashier: 'Amel',
  },
  {
    orderId: '#00011',
    customerName: 'Maya',
    dateAdded: '12-12-2023',
    price: 33000,
    status: 'COMPLETED',
    cashier: 'Amel',
  },
  {
    orderId: '#00012',
    customerName: 'Fullan',
    dateAdded: '12-12-2023',
    price: 22000,
    status: 'COMPLETED',
    cashier: 'Amel',
  },
  {
    orderId: '#00013',
    customerName: 'Anto',
    dateAdded: '12-12-2023',
    price: 42000,
    status: 'COMPLETED',
    cashier: 'Amel',
  },
  {
    orderId: '#00014',
    customerName: 'Andi',
    dateAdded: '12-12-2023',
    price: 10000,
    status: 'COMPLETED',
    cashier: 'Amel',
  },
  {
    orderId: '#00015',
    customerName: 'Chris',
    dateAdded: '12-12-2023',
    price: 8000,
    status: 'COMPLETED',
    cashier: 'Amel',
  },
];
