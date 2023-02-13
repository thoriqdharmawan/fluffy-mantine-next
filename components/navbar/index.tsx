import { Navbar as Nav, NavLink } from '@mantine/core';
import {
  IconHome2,
  IconCash,
  IconBusinessplan,
  IconReceiptRefund,
  IconUsers,
} from '@tabler/icons';
import { useRouter } from 'next/router';

import Link from 'next/link';

interface NabarProps {
  opened: boolean;
}

const data = [
  { icon: IconHome2, label: 'Dasbor', href: '/' },
  {
    icon: IconCash,
    label: 'Pendapatan',
    href: '/income',
  },
  { icon: IconBusinessplan, label: 'Daftar Produk', href: '/products' },
  { icon: IconReceiptRefund, label: 'Riwayat Pesanan', href: '/orders-histories' },
  { icon: IconUsers, label: 'Karyawan', href: '/employee' },
];

export default function Navbar(props: NabarProps) {
  const { opened } = props;
  const router = useRouter();

  const menus = data.map((item, index) => {
    const url = `/${router.pathname.split('/')[1]}`;
    const isActive = url === item.href;

    return (
      <Link key={index} href={item.href}>
        <NavLink
          active={isActive}
          label={item.label}
          icon={<item.icon size={16} stroke={1.5} />}
          my={4}
          styles={{ root: { borderRadius: '5px' } }}
        />
      </Link>
    );
  });

  return (
    <Nav p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <Nav.Section grow>{menus}</Nav.Section>
      <Nav.Section>Last section</Nav.Section>
    </Nav>
  );
}
