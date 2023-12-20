import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { AuthContext } from '../../hooks/useAuthContext';
import Login from '../../pages/Login';
import NavbarGuestButtons from '../Navbar/NavbarGuestButtons';
import RequireGuest from './RequireGuest';
import Dashboard from '../../pages/Dashboard';

describe('<RequireGuest /> component', () => {
  test('renders for guest', () => {
    act(() => {
      render(
        <AuthContext.Provider value={{ user: undefined, setUser: () => {} }}>
          <MemoryRouter>
            <Routes>
              <Route
                path='/'
                element={<RequireGuest><Dashboard /></RequireGuest>}
              />
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
      );
    });
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
  test('skip render for authenticated user', () => {
    act(() => {
      render(
        <AuthContext.Provider
          value={{ user: { role: 'USER' }, setUser: () => {} }}
        >
          <MemoryRouter>
            <Routes>
              <Route
                path='/'
                element={<><NavbarGuestButtons /><Dashboard /></>}
              />
              <Route
                path='/login'
                element={<RequireGuest><Login /></RequireGuest>}
              />
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
      );
    });
    act(() => screen.getByRole('link', { name: /вход/i }).click())
    expect(screen.getByRole('link', { name: /вход/i })).toBeInTheDocument();
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    // Login component render check
    // expect(screen.getByRole('heading', { name: /вход/i })).toBeInTheDocument();
    // expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
  });
});