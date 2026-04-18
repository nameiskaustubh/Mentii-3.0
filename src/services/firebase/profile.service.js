import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
// import { auth, db } from './config/firebase';
import { auth, db } from '../../config/firebase';
import { increment } from "firebase/firestore";
export const fetchUserProfile = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
};


export const logUserActivity = async (uid) => {
  const today = new Date().toISOString().split("T")[0];

  const ref = doc(db, "users", uid);

  await updateDoc(ref, {
    [`activityLog.${today}`]: true,
    totalActiveDays: increment(1),
  });
};
// export const updateUserProfile = async (uid, data) => {
//   const ref = doc(db, 'users', uid);
//   const clean = Object.fromEntries(
//     Object.entries(data).filter(([, v]) => v !== '' && v != null)
//   );
//   if (Object.keys(clean).length > 0) await updateDoc(ref, clean);
//   if (data.displayName && auth.currentUser) {
//     await updateProfile(auth.currentUser, { displayName: data.displayName });
//   }
// };
export const updateUserProfile = async (uid, data) => {
  const ref = doc(db, 'users', uid);
  const clean = Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== '' && v != null)
  );
  if (Object.keys(clean).length > 0) {
    await updateDoc(ref, { ...clean, updatedAt: serverTimestamp() });
  }
  if (data.displayName && auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: data.displayName });
  }
};