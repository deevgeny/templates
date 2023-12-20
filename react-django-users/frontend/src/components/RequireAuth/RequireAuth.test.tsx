import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { AuthContext } from '../../hooks/useAuthContext';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';
import RequireAuth from './RequireAuth';

describe('<RequireAuth /> component', () => {
  test('renders for anonymous user on home page', () => {
    act(() => {
      render(
        <AuthContext.Provider value={{ user: undefined, setUser: () => {} }}>
          <MemoryRouter>
            <Routes>
              <Route
                path='/'
                element={<RequireAuth><Dashboard /></RequireAuth>}
              />
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
      );
    });
    expect(screen.getByRole('heading', {name: /react django users/i}))
    .toBeInTheDocument();
  });
  test('renders for authenticated user on dashboard page', () => {
    act(() => {
      render(
        <AuthContext.Provider value={{ user: { role: 'USER' }, setUser: () => {} }}>
          <MemoryRouter>
            <Routes>
              <Route
                path='/'
                element={<RequireAuth><Dashboard /></RequireAuth>}
              />
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
      );
    });
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
  test('redirects to login page', () => {
    act(() => {
      render(
        <AuthContext.Provider value={{ user: undefined, setUser: () => {} }}>
          <MemoryRouter>
            <Routes>
              <Route
                path='/'
                element={<Navigate to='/account' replace />}
              />
              <Route
                path='/account'
                element={<RequireAuth><Dashboard /></RequireAuth>}
              />
              <Route path='/login' element={<Login />} />
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
      );
    });
    expect(screen.getByRole('heading', { name: 'Вход' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument();
  });
});