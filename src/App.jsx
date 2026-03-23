import { useContext } from 'react';
import './App.css'
import ChatPage from './pages/ChatPage';
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  if (!user) return (
    <div className="auth-shell">
      <Login />
      <Register />
    </div>
  );

  return (
    <div className="app-shell">
      <ChatPage />
    </div>
  )
}

export default App
