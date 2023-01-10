import { Navbar as Nav, NavLink } from '@mantine/core';
import { IconHome2, IconBrandSuperhuman, IconBusinessplan, IconUsers, IconBuildingSkyscraper } from '@tabler/icons';
import { useRouter } from 'next/router';

import Link from 'next/link';

interface NabarProps {
  opened: boolean;
}

const data = [
  { icon: IconHome2, label: 'Dashboard', href: '/' },
  {
    icon: IconBrandSuperhuman,
    label: 'Income',
    href: '/income',
  },
  {
    icon: IconUsers,
    label: 'Users',
    href: '/users',
  },
  { icon: IconBusinessplan, label: 'Products', href: '/products' },
  { icon: IconBusinessplan, label: 'Products Test', href: '/products-test' },
  { icon: IconBuildingSkyscraper, label: 'Company', href: '/company' },
];

export default function Navbar(props: NabarProps) {
  const { opened } = props;
  const router = useRouter();

  const menus = data.map((item, index) => {
    const isActive = router.pathname === item.href;

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
