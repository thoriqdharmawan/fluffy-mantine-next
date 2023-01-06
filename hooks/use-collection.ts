import { getFirestore, collection } from 'firebase/firestore';
import { useCollection as useC } from 'react-firebase-hooks/firestore';
import { FirebaseApp } from '../services/firebase';

const useCollection = (collectionName: string, config = {}) => {
  const [value, loading, error] = useC(
    collection(getFirestore(FirebaseApp), collectionName),
    config
  );

  return {
    data: value?.docs.map((doc) => doc.data()),
    loading,
    error,
  };
};

export default useCollection;
