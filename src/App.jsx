import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import VerifySuccessPage from './pages/VerifySuccessPage';

import { useAuth } from './context/AuthContext';
import OnboardingGate from './components/OnboardingGate';
import Login from './pages/Login';
import Register from './pages/Register';

function ChatRoute() {
  return (
    <div className="app-shell">
      <OnboardingGate />
      <ChatPage />
    </div>
  );
}

function ProfileRoute() {
  return (
    <div className="app-shell">
      <OnboardingGate />
      <ProfilePage />
    </div>
  );
}

function SearchRoute() {
  return (
    <div className="app-shell">
      <OnboardingGate />
      <SearchPage />
    </div>
  );
}

function LoginRoute() {
  return (
    <div className="auth-shell">
      <Login />
    </div>
  );
}

function RegisterRoute() {
  return (
    <div className="auth-shell">
      <Register />
    </div>
  );
}

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Navigate to="/chat" replace />} />
          <Route path="/chat" element={<ChatRoute />} />
          <Route path="/chat/:conversationId" element={<ChatRoute />} />
          <Route path="/search" element={<SearchRoute />} />
          <Route path="/profile" element={<ProfileRoute />} />
          <Route path="/profile/:id" element={<ProfileRoute />} />
          <Route path="/verify-success" element={<VerifySuccessPage />} />
          <Route path="/login" element={<Navigate to="/chat" replace />} />
          <Route path="/register" element={<Navigate to="/chat" replace />} />
          <Route path="*" element={<Navigate to="/chat" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/register" element={<RegisterRoute />} />
          <Route path="/verify-success" element={<VerifySuccessPage />} />
          <Route path="/chat" element={<Navigate to="/login" replace />} />
          <Route path="/chat/:conversationId" element={<Navigate to="/login" replace />} />
          <Route path="/search" element={<Navigate to="/login" replace />} />
          <Route path="/profile" element={<Navigate to="/login" replace />} />
          <Route path="/profile/:id" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  )
}

export default App
