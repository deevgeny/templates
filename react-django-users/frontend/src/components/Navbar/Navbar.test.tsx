import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../hooks/useAuthContext';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('<Navbar /> component', () => {
  test('renders correctly for anonymous user', () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user: undefined, setUser: () => {} }} >
          <Navbar />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    const links = screen.getAllByRole('link');
    const buttons = screen.queryAllByRole('button');
    expect(links.length).toBe(3);
    expect(links[0].textContent).toBe('React Django Users');
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].textContent).toBe('Вход');
    expect(links[2].textContent).toBe('Регистрация');
    expect(buttons.length).toBe(0);
  });
  test('renders correctly for authenticated user', () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider
          value={{ user: { role: 'USER' }, setUser: () => {} }}
        >
          <Navbar />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    const links = screen.getAllByRole('link');
    const buttons = screen.getAllByRole('button');
    expect(links.length).toBe(1);
    expect(links[0].textContent).toBe('React Django Users');
    expect(links[0].getAttribute('href')).toBe('/');
    expect(buttons.length).toBe(2);
    expect(buttons[0].getAttribute('aria-label')).toBe('open-drawer');
    expect(buttons[1].getAttribute('aria-label')).toBe('profile');
  });
});