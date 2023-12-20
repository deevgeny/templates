import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NavbarGuestButtons from './NavbarGuestButtons';

describe('<NavbarGuestButtons /> component', () => {
  test('buttons have correct link path', () => {
    render(
      <MemoryRouter>
        <NavbarGuestButtons />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole('link');
    expect(buttons[0].getAttribute('href')).toBe('/login');
    expect(buttons[1].getAttribute('href')).toBe('/register');
  });
  test('login button should be disabled when rendered on /login path', () => {
    act(() => {
      render(
        <MemoryRouter>
          <Routes>
            <Route path='/' element={<NavbarGuestButtons />} />
            <Route path='/login' element={<NavbarGuestButtons />} />
          </Routes>
        </MemoryRouter>
      );
    });
    const login = screen.getByRole('link', { name: /вход/i });
    expect(login.getAttribute('aria-disabled')).toBe(null);
    act(() => login.click());
    expect(
      screen.getByRole('link', { name: /вход/i }).getAttribute('aria-disabled')
    ).toBe('true');
  });
  test('register button should be disabled when rendered on /register path', () => {
    act(() => {
      render(
        <MemoryRouter>
          <Routes>
            <Route path='/' element={<NavbarGuestButtons />} />
            <Route path='/register' element={<NavbarGuestButtons />} />
          </Routes>
        </MemoryRouter>
      );
    });
    const login = screen.getByRole('link', { name: /регистрация/i });
    expect(login.getAttribute('aria-disabled')).toBe(null);
    act(() => login.click());
    expect(
      screen
      .getByRole('link', { name: /регистрация/i })
      .getAttribute('aria-disabled')
    ).toBe('true');
  });
});