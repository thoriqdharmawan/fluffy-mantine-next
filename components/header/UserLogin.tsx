import { useState } from 'react';

import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  UnstyledButtonProps,
} from '@mantine/core';

import { IconChevronDown, IconLogout } from '@tabler/icons';

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

interface UserButtonProps extends UnstyledButtonProps {
  image: string;
  name: string;
  email: string;
}

export function UserLogin({ image, name, email }: UserButtonProps) {
  const { classes, cx } = useStyles();

  const [userMenuOpened, setUserMenuOpened] = useState(false);

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
              <Avatar src={image} alt={name} radius="xl" size={32} ml={3} />
              <div>
                <Text weight={500} size="sm">
                  {name}
                </Text>
                <Text color="dimmed" size="xs" mt={2}>
                  {email}
                </Text>
              </div>
              <IconChevronDown size={12} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconLogout size={14} stroke={1.5} />}>Logout</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
