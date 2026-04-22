import { useState, useEffect } from 'react';
import { api } from './api';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Library from './screens/Library';
import Exercise from './screens/Exercise';
import Result from './screens/Result';
import TabBar from './components/TabBar';

export default function App() {
  const [screen, setScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      api.setToken(token);
      fetchProfile();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const data = await api.get('/user/profile');
      setUser(data);
      setScreen('home');
    } catch {
      setToken(null);
      localStorage.removeItem('token');
    }
  };

  const handleLogin = async (pseudo, password) => {
    setLoading(true);
    try {
      const data = await api.post('/auth/login', { pseudo, password });
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      api.setToken(data.token);
      setScreen('home');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (prenom, pseudo, password) => {
    setLoading(true);
    try {
      const data = await api.post('/auth/signup', { pseudo, prenom, password });
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      api.setToken(data.token);
      setScreen('home');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    setScreen('login');
  };

  const handleExerciseResult = (res) => {
    setResult(res);
    setScreen('result');
  };

  if (!token) {
    return screen === 'login' ? (
      <Login onLogin={handleLogin} onGoto={() => setScreen('signup')} loading={loading} />
    ) : (
      <Signup onSignup={handleSignup} onGoto={() => setScreen('login')} loading={loading} />
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <Home user={user} onGoto={setScreen} />;
      case 'library':
        return <Library onGoto={setScreen} />;
      case 'exercise':
        return <Exercise onDone={handleExerciseResult} onExit={() => setScreen('home')} />;
      case 'result':
        return <Result result={result} onHome={() => setScreen('home')} />;
      default:
        return <Home user={user} onGoto={setScreen} />;
    }
  };

  const showTabBar = !['exercise', 'result'].includes(screen);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {renderScreen()}
      {showTabBar && <TabBar tab={screen} onTab={setScreen} onLogout={handleLogout} />}
    </div>
  );
}
