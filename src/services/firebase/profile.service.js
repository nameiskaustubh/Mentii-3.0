import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
// import { auth, db } from './config/firebase';
import { auth, db } from '../../config/firebase';

export const fetchUserProfile = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
};

export const updateUserProfile = async (uid, data) => {
  const ref = doc(db, 'users', uid);
  const clean = Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== '' && v != null)
  );
  if (Object.keys(clean).length > 0) await updateDoc(ref, clean);
  if (data.displayName && auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: data.displayName });
  }
};