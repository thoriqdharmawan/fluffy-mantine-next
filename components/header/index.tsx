import { Header as Head, Select, MediaQuery, Burger, useMantineTheme, Group } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { ColorSchemeToggle } from '../color-scheme-toggle';
import { Fullscreen } from '../fullscreen';
import { UserLogin } from './UserLogin';
import { GET_LIST_COMPANIES_BY_USER } from '../../services/homepage/Homepage.graphql';
import { useQuery } from '@apollo/client';
import { useUser } from '../../context/user';

import client from '../../apollo-client';
import { useGlobal, type Global } from '../../context/global';

type HeaderType = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

export default function Header(props: HeaderType) {
  const { opened, setOpened } = props;
  const { value, setValue } = useGlobal()
  const user = useUser()
  const theme = useMantineTheme();

  const { data, loading } = useQuery(GET_LIST_COMPANIES_BY_USER, {
    client: client,
    skip: !user.uid,
    variables: { uid: user.uid }
  })

  return (
    <Head height={{ base: 'auto', md: 70 }} p="md">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o: SetStateAction<boolean>) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Select
          variant='unstyled'
          placeholder="Pilih Toko"
          disabled={loading}
          value={value?.selectedCompany || user.companyId}
          onChange={(value: string) => {
            setValue((prev: Global) => ({
              ...prev,
              selectedCompany: value
            }))
          }}
          data={data?.companies?.map(({ id, name }: { id: string, name: string }) => ({
            value: id,
            label: name
          })) || []}
        />
        <Group position="center">
          <ColorSchemeToggle />
          <Fullscreen />

          <UserLogin />
        </Group>
      </div>
    </Head>
  );
}
