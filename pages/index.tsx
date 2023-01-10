import { Welcome } from '../components/Welcome/Welcome';
import { Button, Group } from '@mantine/core';
import { SignOut } from '../services/authentication';
import { useRouter } from 'next/router';
import { useUser } from '../context/user';

import MainLayout from '../layouts/MainLayout';

export default function HomePage() {
  const user = useUser();
  const router = useRouter();

  const handleClickLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    SignOut();
    user.ResetUser();
  };

  return (
    <MainLayout>
      <Welcome />
      <Group position="center" mt="xl">
        {!user.uid && <Button onClick={handleClickLogin}>Login</Button>}
        {user.uid && <Button onClick={handleLogout}>Logout</Button>}
      </Group>
    </MainLayout>
  );
}
