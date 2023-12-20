import { render, screen, act } from '@testing-library/react';
import { DrawerContext } from '../../hooks/useDrawerContext';
import NavbarDrawerButton from './NavbarDrawerButton';
import AppProviders from '../../providers/AppProviders';

describe('<NavbarDrawerButton /> component', () => {
  test('renders correctly with closed state', () => {
    render(
      <DrawerContext.Provider value={{ open: false, setOpen: () => {} }} >
        <NavbarDrawerButton />
      </DrawerContext.Provider>
    );
    expect(screen.queryByTestId('MenuIcon')).toBeInTheDocument();
  });
  test('renders correctly with opened state', () => {
    render(
      <DrawerContext.Provider value={{ open: true, setOpen: () => {} }} >
        <NavbarDrawerButton />
      </DrawerContext.Provider>
    );
    expect(screen.queryByTestId('CloseIcon')).toBeInTheDocument();
  });
  test('open state setter function called on button click', () => {
    const setOpen = jest.fn();
    act(() => {
      render(
        <DrawerContext.Provider value={{ open: false, setOpen: setOpen }} >
          <NavbarDrawerButton />
        </DrawerContext.Provider>);
    });
    const button = screen.getByRole('button');
    act(() => button.click());
    expect(setOpen).toHaveBeenCalledTimes(1);
  });
  test('button icon should change on button click (toggleDrawer)', () => {
    act(() => {
      render(
        <AppProviders>
          <NavbarDrawerButton />
        </AppProviders>);
    });
    const button = screen.getByRole('button');
    expect(screen.queryByTestId('MenuIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('CloseIcon')).not.toBeInTheDocument();
    act(() => button.click());
    expect(screen.queryByTestId('MenuIcon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('CloseIcon')).toBeInTheDocument();
  });
});