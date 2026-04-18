import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  addJournalEntry,
  getJournalEntries,
  getJournalEntryById,
  updateJournalEntry,
  deleteJournalEntry,
} from '../services/firebase/journal.service';
import toast from 'react-hot-toast';

export const useJournal = () => {
  const { currentUser } = useAuth();
  const [entries,  setEntries]  = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const fetchEntries = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getJournalEntries(currentUser.uid);
      setEntries(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load journal entries.');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const fetchEntryById = useCallback(async (id) => {
    if (!currentUser) return null;
    try {
      return await getJournalEntryById(id, currentUser.uid);
    } catch (err) {
      toast.error('Failed to load entry.');
      return null;
    }
  }, [currentUser]);

  const addEntry = useCallback(async (data) => {
    if (!currentUser) return;
    try {
      const id = await addJournalEntry(currentUser.uid, data);
      toast.success('Entry saved!');
      await fetchEntries();
      return id;
    } catch (err) {
      toast.error('Failed to save entry.');
      throw err;
    }
  }, [currentUser, fetchEntries]);

  const updateEntry = useCallback(async (id, data) => {
    if (!currentUser) return;
    try {
      await updateJournalEntry(id, currentUser.uid, data);
      toast.success('Entry updated!');
      await fetchEntries();
    } catch (err) {
      toast.error('Failed to update entry.');
      throw err;
    }
  }, [currentUser, fetchEntries]);

  const deleteEntry = useCallback(async (id) => {
    if (!currentUser) return;
    try {
      await deleteJournalEntry(id, currentUser.uid);
      toast.success('Entry deleted.');
      await fetchEntries();
    } catch (err) {
      toast.error('Failed to delete entry.');
      throw err;
    }
  }, [currentUser, fetchEntries]);

  return {
    entries, loading, error,
    fetchEntries, fetchEntryById,
    addEntry, updateEntry, deleteEntry,
  };
};