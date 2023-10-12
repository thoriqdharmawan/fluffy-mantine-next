import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { InitialUserState, useUser } from './user';
import { Authentication } from '../services/authentication';

const AuthStateChangeProvider = ({ children }) => {
  const user = useUser();
  const router = useRouter();
  const { SetUser } = user;

  const InitiateAuthStateChange = () => {
    Authentication().onAuthStateChanged((user) => {
      if (user) {
        console.log('User is authenticated');
        SetUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Admin',
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
        });
      } else {
        console.log('User is not authenticated');

        router.push('/login');
        SetUser(InitialUserState);
      }
    });
  };

  useEffect(() => {
    InitiateAuthStateChange();
  }, []);

  return children;
};

export default AuthStateChangeProvider;
