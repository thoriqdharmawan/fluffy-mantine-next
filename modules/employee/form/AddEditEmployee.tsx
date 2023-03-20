import { useRouter } from 'next/router';
import {
  Avatar,
  Button,
  Flex,
  Grid,
  TextInput,
  Textarea,
  NumberInput,
  Select,
} from '@mantine/core';

import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { IconBrandWhatsapp, IconBrandInstagram } from '@tabler/icons';

import MainLayout from '../../../layouts/MainLayout';
import HeaderSection from '../../../components/header/HeaderSection';
import Section from '../../../components/section/Section';

interface Props {
  headerTitle: string;
  headerLabel: string;
}

export default function AddEditEmployee(props: Props) {
  const {headerTitle, headerLabel} = props

  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      username: '',
      address: '',
      position: undefined,
      wa: undefined,
      ig: undefined,
    },

    validate: {
      name: isNotEmpty("Bagian ini diperlukan"),
      email: isEmail('Bukan Alamat Email Yang Valid'),
      username: isNotEmpty("Bagian ini diperlukan"),
      address: isNotEmpty("Bagian ini diperlukan"),
      position: isNotEmpty("Bagian ini diperlukan"),
    },
  });

  const handleBack = () => {
    router.push('/employee');
  };

  const handleSubmit = () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      handleBack()
    }
  }

  return (
    <MainLayout>
      <HeaderSection
        title={headerTitle}
        label={headerLabel}
        onBack={handleBack}
      />

      <Grid>
        <Grid.Col span="auto">
          <Section>
            <Avatar size={120} m="auto" mb="xl" />

            <NumberInput
              icon={<IconBrandWhatsapp />}
              label=""
              placeholder="Tambahkan Nomor Whatapp"
              labelProps={{ mb: 8 }}
              mb={24}
              withAsterisk
              {...form.getInputProps('wa')}
            />
            <TextInput
              icon={<IconBrandInstagram />}
              label=""
              placeholder="Tambahkan Instagram"
              labelProps={{ mb: 8 }}
              mb={24}
              withAsterisk
              {...form.getInputProps('ig')}
            />
          </Section>
        </Grid.Col>
        <Grid.Col sm={12} md={8}>
          <Section>
            <TextInput
              label="Nama Pegawai"
              placeholder="Tambahkan Nama Pegawai"
              labelProps={{ mb: 8 }}
              mb={24}
              withAsterisk
              {...form.getInputProps('name')}
            />
            <Select
              label="Posisi Pegawai"
              placeholder="Pilih Posisi Pegawai"
              labelProps={{ mb: 8 }}
              mb={24}
              withAsterisk
              data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue', label: 'Vue' },
              ]}
              {...form.getInputProps('position')}
            />
            <TextInput
              label="Email Pegawai"
              placeholder="Tambahkan Email Pegawai"
              labelProps={{ mb: 8 }}
              mb={24}
              withAsterisk
              {...form.getInputProps('email')}
            />
            <TextInput
              label="Username Pegawai"
              placeholder="Tambahkan Username Pegawai"
              labelProps={{ mb: 8 }}
              mb={24}
              withAsterisk
              {...form.getInputProps('username')}
            />
            <Textarea
              label="Alamat Pegawai"
              placeholder="Tambahkan Alamat Pegawai"
              labelProps={{ mb: 8 }}
              mb={24}
              minRows={4}
              withAsterisk
              {...form.getInputProps('address')}
            />
          </Section>
        </Grid.Col>
      </Grid>
      <Flex justify="space-between">
        <Button onClick={handleBack} variant="subtle">Batalkan</Button>
        <Button onClick={handleSubmit}>Tambahkan Karyawan</Button>
      </Flex>
    </MainLayout>
  );
}
