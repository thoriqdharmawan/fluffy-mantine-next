import { getFirestore, collection } from 'firebase/firestore';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';

export default function Companies() {
  const [snapshot, loading, error] = useCollectionOnce(collection(getFirestore(), 'companies'));

  if (!loading && snapshot) {
    snapshot.docs.map((doc) => console.log("RESSS :> ", doc.data()));


  }

  console.log({snapshot, loading, error})

  return <div>Companies</div>;
}
