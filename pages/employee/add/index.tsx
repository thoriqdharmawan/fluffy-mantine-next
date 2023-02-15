import { useRouter } from 'next/router';

import MainLayout from '../../../layouts/MainLayout';
import HeaderSection from '../../../components/header/HeaderSection';

export default function index() {
  const router = useRouter();

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
    </MainLayout>
  );
}
