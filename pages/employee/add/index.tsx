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

import MainLayout from '../../../layouts/MainLayout';
import HeaderSection from '../../../components/header/HeaderSection';
import Section from '../../../components/section/Section';
import { useForm } from '@mantine/form';
import { IconBrandWhatsapp, IconBrandInstagram } from '@tabler/icons';

export default function index() {
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
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleBack = () => {
    router.push('/employee');
  };

  return (
    <MainLayout>
      <HeaderSection
        title="Tambah Karyawan"
        label="Anda dapat menambahkan karyawan baru ke dalam aplikasi kami dengan mudah dan cepat. Silakan isi informasi karyawan dengan benar dan tekan tombol simpan untuk menyimpan data karyawan baru."
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
        <Button onClick={handleBack}>Tambahkan Karyawan</Button>
      </Flex>
    </MainLayout>
  );
}
