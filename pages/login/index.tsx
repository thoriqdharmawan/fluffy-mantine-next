import { Box, Paper, TextInput, PasswordInput, Button, Title, Text, Anchor } from '@mantine/core';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import { SignIn } from '../../services/authentication';
import { ColorSchemeToggle } from '../../components/color-scheme-toggle';
import { Fullscreen } from '../../components/fullscreen';

type formLoginType = {
  email: string;
  password: string;
};

export default function index() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 6 ? null : 'Min. 6 characters'),
    },
  });

  const handleSubmit = async (values: formLoginType) => {
    const { email, password } = values;

    try {
      SignIn(email, password);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={styles.wrapper as any}>
      <Paper sx={styles.form as any} radius={0} p={30}>
        <Box>
          <Title order={3} ta="center" mt="md" mb={50}>
            Selamat Datang di Fluffy Pos
          </Title>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email"
              placeholder="email@gmail.com"
              size="md"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Masukan Password"
              mt="md"
              size="md"
              {...form.getInputProps('password')}
            />
            <Button type="submit" fullWidth mt="xl" size="md">
              Login
            </Button>
          </form>
        </Box>
        <Text fz="xs" ta="center">
          Dibuat oleh{' '}
          <Anchor href="https://www.thoriq.pro/" target="_blank">
            https://www.thoriq.pro/
          </Anchor>
        </Text>
      </Paper>
      <Box sx={styles.fab as any}>
        <ColorSchemeToggle />
        <Fullscreen />
      </Box>
    </Box>
  );
}

const styles = {
  wrapper: {
    minHeight: '550px',
    height: '100dvh',
    backgroundSize: 'cover',
    position: 'relative',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80)',
  },
  form: {
    minHeight: '550px',
    maxWidth: '450px',
    paddingTop: '80px',
    height: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '@media (max-width: 768px)': {
      maxWidth: '100%',
    },
  },
  fab: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    top: 22,
    right: 22,
    gap: 12,
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
};
