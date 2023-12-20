import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PasswordChangeForm from './PasswordChangeForm';
import AppProviders from '../../providers/AppProviders';
import userEvent from '@testing-library/user-event';

const TestPasswordChangeForm = () => {
  return (
    <AppProviders>
      <MemoryRouter>
        <PasswordChangeForm />
      </MemoryRouter>
    </AppProviders>
  );
};

describe('<PasswordChangeForm /> component', () => {
  test('renders correctly', () => {
    render(<TestPasswordChangeForm />);
    expect(screen.getByLabelText(/новый пароль/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/повтор пароля/i)).toBeInTheDocument();
    expect(screen.getByText(/сохранить/i).closest('button')).toBeDisabled();
  });
  test('save button is enabled after form data changed', async () => {
    act(() => render(<TestPasswordChangeForm />));
    act(() => userEvent.type(screen.getByLabelText(/новый пароль/i), '1'));
    await waitFor(() => expect(screen.getByRole('button')).toBeInTheDocument());
  });
});