import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { app } from '../firebase';

export const FirebaseAuth = getAuth(app);

export const Authentication = () => {
  return FirebaseAuth;
};

export const SignUp = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(FirebaseAuth, email, password);
};

export const SignIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(FirebaseAuth, email, password);
};

export const SignOut = async () => {
  await signOut(FirebaseAuth);
};
