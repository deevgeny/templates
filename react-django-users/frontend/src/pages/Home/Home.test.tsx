import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AppProviders from '../../providers/AppProviders';
import App from '../../App';
import Dashboard from '../Dashboard';
import RequireAuth from '../../components/RequireAuth';
import RequireGuest from '../../components/RequireGuest';
import Login from '../Login';
import Register from '../Register';
import Home from './Home';
import { AuthContext } from '../../hooks/useAuthContext';
import { ErrorContext } from '../../hooks/useErrorContext';

const TestAppRender = () => {
  return (
    <AppProviders>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </AppProviders>
  );
};

describe('<Home /> page', () => {
  test('renders correctly for guest user', () => {
    render(<TestAppRender />);
    expect(screen.getByRole('link', { name: /react django users/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /вход/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /вход/i }).hidden).toBeFalsy();
    expect(screen.getByRole('link', { name: /регистрация/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /регистрация/i }).hidden).toBeFalsy();
    expect(screen.getByRole('heading', { name: /react django users/i })).toBeInTheDocument();
    expect(screen.getByRole(
      'heading',
      {
        name:
          /базовое веб приложение с регистрацией и авторизацие/i
      })
    ).toBeInTheDocument();
    expect(screen.getByRole('img', {  name: /always by hand/i})).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /easy to use/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /analytics/i })).toBeInTheDocument();
    expect(screen.getByText(/всегда под рукой/i)).toBeInTheDocument();
    expect(screen.getByText(/легко использовать/i)).toBeInTheDocument();
    expect(screen.getByText(/анализ и статистика/i)).toBeInTheDocument();
  });
  test('renders correctly for authenticated user', () => {
    render(
      <AuthContext.Provider value={{ user: { role: 'USER' }, setUser: () => {} }}>
        <MemoryRouter>
          <Routes>
            <Route path='/' element={<Home />}>
              <Route index element={<RequireAuth><Dashboard /></RequireAuth>}/>
              <Route path='login' element={<RequireGuest><Login /></RequireGuest>} />
              <Route path='register' element={<RequireGuest><Register /></RequireGuest>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByRole('button', { name: /open\-drawer/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /react django users/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /вход/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /регистрация/i })).not.toBeInTheDocument();
  });
  test('open error dialog', () => {
    render(
      <ErrorContext.Provider 
        value={{
          error: {message: { title: 'error title', text: 'error text' }},
          setError: () => {} 
        }}
      >
        <AuthContext.Provider value={{ user: { role: 'USER' }, setUser: () => {} }}>
          <MemoryRouter>
            <Routes>
              <Route path='/' element={<Home />}>
                <Route index element={<RequireAuth><Dashboard /></RequireAuth>}/>
                <Route path='login' element={<RequireGuest><Login /></RequireGuest>} />
                <Route path='register' element={<RequireGuest><Register /></RequireGuest>} />
              </Route>
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
      </ErrorContext.Provider>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog').hidden).toBeFalsy();
  });
});