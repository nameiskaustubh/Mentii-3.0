import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/layout/PrivateRoute';

// Eager — always needed
import Home          from './pages/Home';
import Login         from './pages/auth/Login';
import Signup        from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';

// Lazy — only loaded when user navigates there
const Dashboard       = lazy(() => import('./pages/Dashboard'));
const Profile         = lazy(() => import('./pages/Profile'));
const SentimentAnalysis = lazy(() => import('./pages/modules/SentimentAnalysis'));
const CBTJournalList  = lazy(() => import('./pages/modules/CBTJournal'));
const CBTJournalNew   = lazy(() => import('./pages/modules/CBTJournal/EntryForm'));
const CBTJournalView  = lazy(() => import('./pages/modules/CBTJournal/EntryDetail'));
const ColorPsychology = lazy(() => import('./pages/modules/ColorPsychology'));
const FinalResult     = lazy(() => import('./pages/modules/FinalResult'));

const PageLoader = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div style={{
      width: 40, height: 40,
      border: '3px solid #e2e8f0',
      borderTop: '3px solid #6366f1',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const App = () => (
  <div className="app">
    <Navbar />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public */}
        <Route path="/"               element={<Home />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/signup"         element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Private */}
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute><Profile /></PrivateRoute>
        } />
        <Route path="/sentimental-analysis" element={
          <PrivateRoute><SentimentAnalysis /></PrivateRoute>
        } />
        <Route path="/cbt-journal" element={
          <PrivateRoute><CBTJournalList /></PrivateRoute>
        } />
        <Route path="/cbt-journal/new" element={
          <PrivateRoute><CBTJournalNew /></PrivateRoute>
        } />
        <Route path="/cbt-journal/view/:id" element={
          <PrivateRoute><CBTJournalView /></PrivateRoute>
        } />
        <Route path="/cbt-journal/edit/:id" element={
          <PrivateRoute><CBTJournalView /></PrivateRoute>
        } />
        <Route path="/color-psychology" element={
          <PrivateRoute><ColorPsychology /></PrivateRoute>
        } />
        <Route path="/final-result" element={
          <PrivateRoute><FinalResult /></PrivateRoute>
        } />
      </Routes>
    </Suspense>
  </div>
);

export default App;