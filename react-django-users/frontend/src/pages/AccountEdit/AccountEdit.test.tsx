import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import nock from 'nock';
import { baseUrl } from '../../services/axios';
import { replyHeaders } from '../../test/testHelpers';
import AppProviders from '../../providers/AppProviders';
import AccountEdit from './AccountEdit';

const TestAccountEdit = () => {
  return (
    <AppProviders>
      <MemoryRouter>
        <AccountEdit />
      </MemoryRouter>
    </AppProviders>
  );
};

describe('<AccountEdit /> page', () => {
  test('renders correctly', async () => {
    nock(baseUrl)
    .persist()
    .defaultReplyHeaders(replyHeaders)
    .get('/users/me')
    .reply(200, {
      role: 'USER',
      first_name: 'Alex',
      last_name: 'Bloom',
      email: 'alex@example.com',
      phone: '+7 (000) 000-00-00'
    });
    act(() => render(<TestAccountEdit />));
    // Check profile edit card
    await waitFor(() => expect(screen.getByText(/профиль/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('textbox', { name: /имя/i })).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('textbox', { name: /фамилия/i })).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('textbox', { name: /номер телефона/i })).toBeInTheDocument());
    // Check change password card
    await waitFor(() => expect(screen.getByLabelText(/новый пароль/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByLabelText(/повтор пароля/i)).toBeInTheDocument());
  });

});