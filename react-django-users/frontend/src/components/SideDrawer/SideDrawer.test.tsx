import { render, screen } from '@testing-library/react';
import { DrawerContext } from '../../hooks/useDrawerContext';
import SideDrawer from './SideDrawer';

describe('<SideDrawer /> component', () => {
  test('should be hidden', () => {
    render(
      <DrawerContext.Provider value={{ open: false, setOpen: () => {} }}>
        <SideDrawer />
      </DrawerContext.Provider>
    );
    expect(screen.queryByText(/калькуляторы/i)).toBe(null);
  });
/*   test('should be visible on click', () => {
    act(() => {
      render(
        <AppProviders>
          <NavbarDrawerButton />
          <SideDrawer />
          <Footer />
        </AppProviders>
      );
    });
    expect(screen.queryByText(/калькуляторы/i)).toBe(null);
    act(() => screen.getByRole('button', {  name: /open\-drawer/i}).click());
    expect(screen.queryByText(/калькуляторы/i)).toBeInTheDocument();
  }); */
/*   test('should close after clicking outside the component', () => {
    act(() => {
      render(
        <AppProviders>
          <NavbarDrawerButton />
          <SideDrawer />
          <Footer />
        </AppProviders>
      );
    });
    // Check that drawer is closed
    expect(screen.queryByText(/калькуляторы/i)).toBe(null);
    // Click drawer button to open drawer
    act(() => screen.getByRole('button', {  name: /open\-drawer/i}).click());
    // Check that drawer is opened
    expect(screen.queryByText(/калькуляторы/i)).toBeInTheDocument();
    // Click outside drawer
    act(() => screen.getByText(/automotive paint shop/i).click());
    act(() => document.body.click());
    // Check that drawer is closed again
    //expect(screen.queryByText(/калькуляторы/i)).toBe(null);
  }); */
});