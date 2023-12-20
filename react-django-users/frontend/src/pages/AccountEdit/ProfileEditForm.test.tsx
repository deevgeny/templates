import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import nock from 'nock';
import ProfileEditForm from './ProfileEditForm';
import AppProviders from '../../providers/AppProviders';
import { baseUrl } from '../../services/axios';
import { replyHeaders } from '../../test/testHelpers';
import userEvent from '@testing-library/user-event';

const TestProfileEditForm = () => {
  return (
    <AppProviders>
      <MemoryRouter>
        <ProfileEditForm />
      </MemoryRouter>
    </AppProviders>
  );
};

describe('<ProfileEditForm /> component', () => {
  test('renders correctly with user data', async () => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .get('/users/me')
    .reply(200, {
      role: 'USER',
      first_name: 'Alex',
      last_name: 'Bloom',
      email: 'alex@example.com',
      phone: '+7 (000) 000-00-00'
    });
    act(() => render(<TestProfileEditForm />));
    expect(screen.getByRole('textbox', { name: /имя/i })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole('textbox', { name: /имя/i })).toHaveValue('Alex'));
    expect(screen.getByRole('textbox', { name: /фамилия/i })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole('textbox', { name: /фамилия/i })).toHaveValue('Bloom'));
    expect(screen.getByRole('textbox', { name: /номер телефона/i })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole('textbox', { name: /номер телефона/i })).toHaveValue('+7 (000) 000-00-00'));
    await waitFor(() => expect(screen.getByText(/сохранить/i).closest('button')).toBeDisabled());
  });
  test('save button disabled/enabled behavior', async () => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .get('/users/me')
    .reply(200, {
      role: 'USER',
      first_name: 'Alex',
      last_name: 'Bloom',
      email: 'alex@example.com',
      phone: '+7 (000) 000-00-00'
    });
    act(() => render(<TestProfileEditForm />));
    await waitFor(() => expect(screen.getByText(/сохранить/i).closest('button')).toBeDisabled());
    await waitFor(() => expect(screen.queryByText('✔')).toBeNull());
    act(() => userEvent.type(screen.getByRole('textbox', { name: /имя/i }), 'z'));
    await waitFor(() => expect(screen.getByRole('textbox', { name: /имя/i })).toHaveValue('Alexz'));
    await waitFor(() => expect(screen.getByText('✔')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/сохранить/i).closest('button')).toBeEnabled());
  });
  test('renders correctly with 404 response status', async () => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .get('/users/me')
    .reply(404, {});
    act(() => render(<TestProfileEditForm />));
    await waitFor(() => expect(screen.getByText(/сохранить/i).closest('button')).toBeDisabled());
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Неизвестная ошибка'));
  });
  test('submit data with ', async () => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .get('/users/me')
    .reply(200, {
      role: 'USER',
      first_name: 'Alex',
      last_name: 'Bloom',
      email: 'alex@example.com',
      phone: '+7 (000) 000-00-00'
    })
    .patch('/users/me')
    .reply(200, {
      role: 'USER',
      first_name: 'Alexz',
      last_name: 'Bloom',
      email: 'alex@example.com',
      phone: '+7 (000) 000-00-00'
    });
    act(() => render(<TestProfileEditForm />));
    await waitFor(() => expect(screen.getByText(/сохранить/i).closest('button')).toBeDisabled());
    await waitFor(() => expect(screen.getByRole('textbox', { name: /имя/i })).toHaveValue('Alex'));
    act(() => userEvent.type(screen.getByRole('textbox', { name: /имя/i }), 'z'));
    await waitFor(() => expect(screen.getByRole('textbox', { name: /имя/i })).toHaveValue('Alexz'));
    // act(() => userEvent.click(screen.getByRole('button')));
    //await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    //expect(screen.getByRole('alert')).toHaveTextContent(/данные обновлены/i);
  });
});