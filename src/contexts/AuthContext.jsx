import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from 'firebase';
import { auth } from '../config/firebase';
import {
  signupWithEmail,
  signinWithEmail,
  signinWithGoogle,
  signinAnon,
  signoutUser,
  resetPassword,
  createRecaptcha,
  sendPhoneCode,
} from '../services/firebase/auth.service';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = {
    currentUser,
    loading,
    signup:           signupWithEmail,
    signin:           signinWithEmail,
    signInWithGoogle: signinWithGoogle,
    signinAnonymously: signinAnon,
    signout:          signoutUser,
    resetPassword,
    createRecaptcha,
    sendPhoneCode,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};