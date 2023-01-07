import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { SignIn } from '../../services/authentication';
import { useRouter } from 'next/router';

type formLoginType = {
  email: string,
  password: string,
  termsOfService: Boolean
}

export default function index() {
  const router = useRouter()
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 6 ? null : 'Min. 6 characters'),
    },
  });

  const handleSubmit = async (values: formLoginType) => {
    const { email, password } = values;
    console.log({ email, password });

    try {
      await SignIn(email, password)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          label="Password"
          type="password"
          placeholder="Input your password"
          {...form.getInputProps('password')}
        />

        <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
