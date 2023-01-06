import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Button, Group } from '@mantine/core';
import { SignOut } from '../services/firebase';
import { useRouter } from 'next/router';
import { useUser } from '../context/user';
import Companies from '../components/Companies/Companies';

export default function HomePage() {
  const user = useUser();
  const router = useRouter();

  console.log('data user : ', user);

  const handleClickLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    SignOut();
    user.ResetUser();
  };

  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <Companies />
      <Group position="center" mt="xl">
        {!user.uid && <Button onClick={handleClickLogin}>Login</Button>}
        {user.uid && <Button onClick={handleLogout}>Logout</Button>}
      </Group>
    </>
  );
}
