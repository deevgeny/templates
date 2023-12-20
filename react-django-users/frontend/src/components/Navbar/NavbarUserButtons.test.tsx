import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AppProviders from '../../providers/AppProviders';
import NavbarUserButtons from './NavbarUserButtons';

describe('<NavbarUserButtons /> component', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <AppProviders>
          <NavbarUserButtons />
        </AppProviders>
      </MemoryRouter>
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.getAttribute('aria-label')).toBe('profile');
  });
  test('account button expands correct items on click', () => {
    act(() => {
      render(
        <MemoryRouter>
          <AppProviders>
            <NavbarUserButtons />
          </AppProviders>
        </MemoryRouter>
      );
    });
    const button = screen.getByRole('button');
    expect(screen.queryAllByRole('menuitem').length).toBe(0);
    act(() => {button.click()})
    const items = screen.queryAllByRole('menuitem');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toBe('Аккаунт');
    expect(items[1].textContent).toBe('Выход');
  });
  test('draft test need to improve path checks', async () => {
    act(() => {
      render(
        <MemoryRouter>
          <AppProviders>
            <Routes>
              <Route path='/' element={<NavbarUserButtons />} />
              <Route path='/account' element={<NavbarUserButtons />} />
            </Routes>
          </AppProviders>
        </MemoryRouter>
      );
    });
    const button = screen.getByRole('button');
    act(() => button.click());
    act(() => screen.getByRole('menuitem', {  name: /аккаунт/i }).click());
    // Check path
    act(() => button.click());
    act(() => screen.getByRole('menuitem', {  name: /выход/i }).click());
    // Check path
  });
});