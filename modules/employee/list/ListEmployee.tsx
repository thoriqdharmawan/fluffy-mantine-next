import { Dispatch, SetStateAction, useEffect } from 'react'
import { Box, Button, Paper, LoadingOverlay, Group, Pagination } from '@mantine/core';
import { IconCheck, IconExclamationMark, IconPlus } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { useQuery } from '@apollo/client';
import { usePagination } from '@mantine/hooks';
import Link from 'next/link';

import { Empty } from '../../../components/empty-state';
import { useUser } from '../../../context/user';
import { GET_LIST_EMPLOYEES, updateEmployeeStatus } from '../../../services/employee';
import client from '../../../apollo-client';

import Header from './Header';
import EmployeeItem from './EmployeeItem';
import Loading from '../../../components/loading/Loading';

type Props = {
  search?: string;
};

const LIMIT = 5;

export default function ListEmployee(props: Props) {
  const { search } = props
  const { companyId } = useUser();
  const pagination = usePagination({ total: 10, initialPage: 1 });

  const { data, loading, error, refetch } = useQuery(GET_LIST_EMPLOYEES, {
    client: client,
    skip: !companyId,
    variables: {
      limit: LIMIT,
      offset: (pagination.active - 1) * LIMIT,
      where: {
        companyId: { _eq: companyId },
        _or: search ? { name: { _ilike: `%${search}%` }, username: { _ilike: `%${search}%` } } : undefined,
      }
    }
  })

  if (error) {
    console.error(error)
  }


  useEffect(() => {
    pagination.setPage(1)
  }, [search])

  const loadingData = !companyId || loading;
  const totalPage = Math.ceil((data?.total.aggregate.count || 0) / LIMIT);

  const handleUpdateStatus = (employeeId: string, status: string) => {
    updateEmployeeStatus({
      variables: {
        employeeId,
        status: status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
      },
    })
      .then(() => {
        refetch()
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
    <Paper shadow="md" radius="md" p="md">
      <Header />
      <Box mih={120}>
        {loadingData && <Loading height={80} />}

        {data?.total.aggregate.count === 0 && (
          <Empty
            title="Tidak Ada Karyawan"
            label="Belum ada karyawan yang terdaftar. Mulai menambahkan karyawan baru dengan menekan tombol Tambah Karyawan."
            action={
              <Link href="/employee/add">
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

        <Group mt={24} mb={12}>
          <Pagination m="auto" page={pagination.active} total={totalPage} onChange={pagination.setPage} />
        </Group>
      </Box>
    </Paper>
  );
}
