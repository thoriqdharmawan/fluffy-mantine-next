import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';

import { db } from '../../services/firebase';

import MainLayout from '../../layouts/MainLayout';
import useQuery from '../../hooks/use-query';
import { Button, Card, Group, Progress, Text, Image } from '@mantine/core';

export default function Users() {
  const companiesCollectionRef = collection(db, 'companies');
  const { data, loading, refetch } = useQuery(companiesCollectionRef);

  const handleAddCompany = async () => {
    const variables = {
      name: `Comapny Name ${data?.length + 1}`,
      address: `Company Address ${data.length + 1}`,
    };

    console.log(variables);
    try {
      const docRef = await addDoc(companiesCollectionRef, variables);
      console.log('Document written with ID: ', docRef.id);
      refetch();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const deleteCompany = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'companies', id));
      console.log('Deleted');
      refetch();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <MainLayout>
      <div>Users</div>
      <br />

      <Button variant="filled" onClick={handleAddCompany}>
        Add Company
      </Button>

      {loading && <Progress />}
      {data.map((res) => (
        <Demo
          key={res.id}
          name={res.name}
          address={res.address}
          onDelete={() => deleteCompany(res.id)}
        />
      ))}
    </MainLayout>
  );
}

function Demo({ name, address, onDelete }: { name: string; address: string; onDelete: any }) {
  return (
    <Card shadow="sm" p="lg" radius="md" maw="500px" m={24} withBorder>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{name}</Text>
      </Group>

      <Text size="sm" color="dimmed">
        {address}
      </Text>

      <Button onClick={onDelete} variant="light" color="blue" fullWidth mt="md" radius="md">
        Delete
      </Button>
    </Card>
  );
}
