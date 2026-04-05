import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

export const saveAssessment = async (userId, moduleType, data, summary) => {
  await addDoc(collection(db, 'assessments'), {
    ...data,
    userId,
    moduleType,
    timestamp: serverTimestamp(),
  });

  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    [`moduleProgress.${moduleType}`]: {
      completed: true,
      completedAt: serverTimestamp(),
      summary: summary ?? { score: data.overallScore ?? 0 },
    },
    lastAssessmentAt: serverTimestamp(),
  });
};

export const getAssessments = async (userId) => {
  const q = query(collection(db, 'assessments'), where('userId', '==', userId));
  const snap = await getDocs(q);
  const results = {};
  snap.forEach((d) => {
    results[d.data().moduleType] = { ...d.data(), id: d.id };
  });
  return results;
};

export const deleteAllAssessments = async (userId) => {
  const q = query(collection(db, 'assessments'), where('userId', '==', userId));
  const snap = await getDocs(q);
  await Promise.all(snap.docs.map((d) => deleteDoc(doc(db, 'assessments', d.id))));
};