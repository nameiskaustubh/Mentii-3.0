import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  saveAssessment,
  getAssessments,
  deleteAllAssessments,
} from '../services/firebase/assessment.service';
import toast from 'react-hot-toast';

export const useAssessments = () => {
  const { currentUser } = useAuth();
  const [assessments, setAssessments] = useState({});
  const [loading,     setLoading]     = useState(false);

  const fetchAssessments = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const data = await getAssessments(currentUser.uid);
      setAssessments(data);
    } catch (err) {
      toast.error('Failed to load assessments.');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const save = useCallback(async (moduleType, data, summary) => {
    if (!currentUser) return;
    try {
      await saveAssessment(currentUser.uid, moduleType, data, summary);
      await fetchAssessments();
      toast.success('Assessment saved!');
    } catch (err) {
      toast.error('Failed to save assessment.');
      throw err;
    }
  }, [currentUser, fetchAssessments]);

  const deleteAll = useCallback(async () => {
    if (!currentUser) return;
    try {
      await deleteAllAssessments(currentUser.uid);
      setAssessments({});
      toast.success('All assessments deleted.');
    } catch (err) {
      toast.error('Failed to delete assessments.');
      throw err;
    }
  }, [currentUser]);

  return {
    assessments, loading,
    fetchAssessments, save, deleteAll,
  };
};