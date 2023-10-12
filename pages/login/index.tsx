import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { SignIn } from '../../services/authentication';
import { useRouter } from 'next/router';

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
    <Box sx={{ maxWidth: 300 }} mt="xl" mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Masukan Email"
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          label="Password"
          type="password"
          placeholder="Masukan Password"
          {...form.getInputProps('password')}
        />

        <Group position="right" mt="md">
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Box>
  );
}
