import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
// import { auth, db } from './config/firebase';
import { auth, db } from "../../config/firebase";

export const createUserProfile = async (uid, email, displayName = '') => {
  const ref = doc(db, 'users', uid);
  await setDoc(ref, {
    uid,
    email,
    displayName: displayName || email,
    createdAt: serverTimestamp(),
    moduleProgress: {
      sentimentAnalysis: { completed: false, completedAt: null, summary: null },
      cbt:              { completed: false, completedAt: null, summary: null },
      colorPsychology:  { completed: false, completedAt: null, summary: null },
      finalAnalysis:    { completed: false, completedAt: null, summary: null },
    },
  });
};

export const signupWithEmail = async (email, password, displayName) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName });
  await createUserProfile(cred.user.uid, email, displayName);
  return cred;
};

export const signinWithEmail = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signinWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  const ref = doc(db, 'users', cred.user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await createUserProfile(cred.user.uid, cred.user.email, cred.user.displayName);
  }
  return cred;
};

export const signinAnon = () => signInAnonymously(auth);

export const signoutUser = () => signOut(auth);

export const resetPassword = (email) => sendPasswordResetEmail(auth, email.trim());

export const createRecaptcha = (containerId) => {
  return new RecaptchaVerifier(auth, containerId, { size: 'invisible' });
};

export const sendPhoneCode = (phone, verifier) => {
  return signInWithPhoneNumber(auth, phone, verifier);
};