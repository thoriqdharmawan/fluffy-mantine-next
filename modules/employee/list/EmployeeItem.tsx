import { useState } from 'react';
import { ActionIcon, Avatar, Badge, Box, Divider, Flex, Text, Switch } from '@mantine/core';
import { IconDots, IconEye, IconEdit, IconTrash, IconCopy } from '@tabler/icons';

import { getInitials } from '../../../context/helpers';
import MenuDropdown from '../../../components/menu/MenuDropdown';

type Props = {
  image: string;
  name: string;
  position: string;
  email: string;
  status: string;
  onUpdateStatus: (status: string) => void;
};

export default function EmployeeItem(props: Props) {
  const { image, name, position, email, status, onUpdateStatus } = props;
  const [loadingUpdateStatus, setLoadingUpdateStatus] = useState(false);

  const EMPLOYEES_ACTION_MENUS = [
    {
      items: [
        {
          icon: <IconEye size={14} />,
          children: 'Rincian',
        },
        {
          icon: <IconEdit size={14} />,
          children: 'Ubah',
        },
        {
          icon: <IconCopy size={14} />,
          children: 'Duplikat',
        },
      ],
    },
    {
      items: [
        {
          icon: <IconTrash size={14} />,
          color: 'red',
          children: 'Hapus',
        },
      ],
    },
  ];

  const handleChangeStatus = async (status: string) => {
    setLoadingUpdateStatus(true);
    await onUpdateStatus(status);
    setLoadingUpdateStatus(false);
  };

  return (
    <>
      <Divider />
      <Box>
        <Flex gap="md" justify="flex-start" align="center" direction="row" wrap="nowrap" px="24px">
          <Box fw={600} w="10%" py="md">
            <Avatar src={image} size="lg" color="blue">
              {getInitials(name)}
            </Avatar>
          </Box>
          <Box fw={600} w="40%">
            <Text fw={400}>{name}</Text>
          </Box>
          <Box fw={600} w="15%">
            <Text fw={400}>
              <Badge variant="outline" tt="capitalize" size="lg">
                {position}
              </Badge>
            </Text>
          </Box>
          <Box fw={600} w="20%">
            <Text fw={400} color="blue">
              {email}
            </Text>
          </Box>
          <Box fw={600} w="6%">
            <Switch
              disabled={loadingUpdateStatus}
              checked={status === 'ACTIVE'}
              styles={{ root: { display: 'flex' }, track: { cursor: 'pointer' } }}
              onChange={() => handleChangeStatus(status)}
            />
          </Box>
          <Box fw={600} w="9%">
            <Flex gap="sm" align="center">
              <MenuDropdown sections={EMPLOYEES_ACTION_MENUS}>
                <ActionIcon>
                  <IconDots size={18} />
                </ActionIcon>
              </MenuDropdown>

              {/* {loadingDelete && <Loader size="xs" color="gray" />} */}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
