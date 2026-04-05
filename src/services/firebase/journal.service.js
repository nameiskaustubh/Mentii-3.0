import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
// import { db } from './config/firebase';
import { db } from '../../config/firebase';

export const addJournalEntry = async (userId, data) => {
  const ref = await addDoc(collection(db, 'journal_entries'), {
    ...data,
    userId,
    timestamp: serverTimestamp(),
  });

  const countSnap = await getDocs(
    query(collection(db, 'journal_entries'), where('userId', '==', userId))
  );

  await updateDoc(doc(db, 'users', userId), {
    'moduleProgress.cbt': {
      completed: true,
      completedAt: serverTimestamp(),
      summary: { entryCount: countSnap.size },
    },
  });

  return ref.id;
};

export const getJournalEntries = async (userId) => {
  const q = query(
    collection(db, 'journal_entries'),
    where('userId', '==', userId),
    orderBy('timestamp', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    timestamp: d.data().timestamp?.toDate?.() ?? null,
  }));
};

export const getJournalEntryById = async (entryId, userId) => {
  const snap = await getDoc(doc(db, 'journal_entries', entryId));
  if (!snap.exists() || snap.data().userId !== userId) return null;
  return { id: snap.id, ...snap.data(), timestamp: snap.data().timestamp?.toDate?.() ?? null };
};

export const updateJournalEntry = async (entryId, userId, data) => {
  const snap = await getDoc(doc(db, 'journal_entries', entryId));
  if (!snap.exists() || snap.data().userId !== userId) throw new Error('Unauthorized');
  await updateDoc(doc(db, 'journal_entries', entryId), { ...data, updatedAt: serverTimestamp() });
};

export const deleteJournalEntry = async (entryId, userId) => {
  const snap = await getDoc(doc(db, 'journal_entries', entryId));
  if (!snap.exists() || snap.data().userId !== userId) throw new Error('Unauthorized');
  await deleteDoc(doc(db, 'journal_entries', entryId));

  const countSnap = await getDocs(
    query(collection(db, 'journal_entries'), where('userId', '==', userId))
  );
  await updateDoc(doc(db, 'users', userId), {
    'moduleProgress.cbt.summary.entryCount': countSnap.size,
    'moduleProgress.cbt.completed': countSnap.size > 0,
  });
};