import { useState } from 'react';

import {
  createStyles,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
} from '@mantine/core';

import { IconChevronDown, IconLogout } from '@tabler/icons';
import { SignOut } from '../../services/authentication';
import { useUser } from '../../context/user';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}));

const getInitials = (str: string, photoURL: string) => {
  if (photoURL) {
    return str
      .split(' ')
      .slice(0, 2)
      .map((word) => word[0])
      .join('');
  }
};

export function UserLogin() {
  const { classes, cx } = useStyles();
  const user = useUser();
  const router = useRouter();

  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const handleLogout = async () => {
    await SignOut();
    user.ResetUser();
    router.push('/login');
  };

  return (
    <>
      <Menu
        width={260}
        position="bottom-end"
        transition="pop-top-right"
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
      >
        <Menu.Target>
          <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
            <Group spacing={7}>
              <Avatar src={user.photoURL} alt={user.displayName} radius="xl" size={32}>
                {getInitials(user.displayName, user.photoURL)}
              </Avatar>
              <div>
                <Text weight={500} sx={{ lineHeight: 1 }} size="sm">
                  {user.displayName}
                </Text>
                <Text color="dimmed" sx={{ lineHeight: 1 }} size="xs" mt={2}>
                  {user.email}
                </Text>
              </div>
              <IconChevronDown size={12} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={handleLogout} icon={<IconLogout size={14} stroke={1.5} />}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
