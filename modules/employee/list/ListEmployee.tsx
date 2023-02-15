import { useEffect, useState } from 'react';
import { Box, Button, Paper, LoadingOverlay } from '@mantine/core';
import { IconCheck, IconExclamationMark, IconPlus } from '@tabler/icons';

import Link from 'next/link';

import { Empty } from '../../../components/empty-state';
import { useUser } from '../../../context/user';
import { getListEmployees, updateEmployeeStatus } from '../../../services/employee';

import Header from './Header';
import EmployeeItem from './EmployeeItem';
import { showNotification } from '@mantine/notifications';

type Props = {
  search?: string;
};

export default function ListEmployee({ search }: Props) {
  const { companyId } = useUser();
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);

  const getData = (withLoading: boolean) => {
    if (withLoading) {
      setLoading(true);
    }
    getListEmployees({
      variables: { companyId, search: `%${search}%` },
      fetchPolicy: 'network-only',
    }).then((result) => {
      setData(result.data);
      setLoading(result.loading);
    });
  };

  useEffect(() => {
    if (companyId) {
      getData(true);
    }
  }, [companyId, search]);

  const loadingData = !companyId || loading;

  const handleUpdateStatus = (employeeId: string, status: string) => {
    updateEmployeeStatus({
      variables: {
        employeeId,
        status: status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
      },
    })
      .then(() => {
        getData(false);
        showNotification({
          title: 'Yeayy, Berhasil Mengubah Status Karyawan!! 😊',
          message: 'Status Karyawan Berhasil Diubah',
          icon: <IconCheck />,
          color: 'green',
        });
      })
      .catch(() => {
        showNotification({
          title: 'Gagal Menghapus Karyawan 🤥',
          message: 'Status Karyawan Gagal Diubah',
          icon: <IconExclamationMark />,
          color: 'red',
        });
      });
  };

  return (
    <Paper shadow="md" radius="md">
      <Header />
      <Box pos="relative" mih={120}>
        <LoadingOverlay zIndex={1} visible={loadingData} overlayBlur={2} />

        {data?.total.aggregate.count === 0 && (
          <Empty
            title="Tidak Ada Karyawan"
            label="Belum ada karyawan yang terdaftar. Mulai menambahkan karyawan baru dengan menekan tombol Tambah Karyawan."
            action={
              <Link href="/products/add">
                <Button leftIcon={<IconPlus size={16} />} mt="xl">
                  Tambah Karyawan
                </Button>
              </Link>
            }
          />
        )}
        {data?.employees.map((employee: any) => {
          return (
            <EmployeeItem
              key={employee.id}
              name={employee.name}
              image={employee.image}
              position={employee.position?.name || '-'}
              email={employee.email}
              status={employee.status}
              onUpdateStatus={(status) => handleUpdateStatus(employee.id, status)}
            />
          );
        })}
      </Box>
    </Paper>
  );
}
