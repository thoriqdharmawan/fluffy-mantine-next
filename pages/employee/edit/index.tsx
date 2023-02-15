import { useRouter } from 'next/router';

import MainLayout from '../../../layouts/MainLayout';
import HeaderSection from '../../../components/header/HeaderSection';
type Props = {};

export default function index({}: Props) {
  const router = useRouter();

  const handleBack = () => {
    router.push('/employee');
  };

  return (
    <MainLayout>
      <HeaderSection
        title="Ubah Karyawan"
        label="Anda dapat mengubah karyawan ke dalam aplikasi kami dengan mudah dan cepat. Silakan isi informasi karyawan dengan benar dan tekan tombol simpan untuk menyimpan data karyawan baru."
        onBack={handleBack}
      />
    </MainLayout>
  );
}
