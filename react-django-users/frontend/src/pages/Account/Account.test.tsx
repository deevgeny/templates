import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import nock from 'nock';
import { baseUrl } from '../../services/axios';
import { replyHeaders } from '../../test/testHelpers';
import AppProviders from '../../providers/AppProviders';
import Account from './Account';

const TestAccount = () => {
  return (
    <AppProviders>
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    </AppProviders>
  );
};

describe('<Account /> page', () => {
  test('renders correctly with user data', async () => {
    nock(baseUrl)
    .persist(true)
    .defaultReplyHeaders(replyHeaders)
    .get('/users/me')
    .reply(200, {
      role: 'USER',
      first_name: 'Alex',
      last_name: 'Bloom',
      email: 'alex@example.com',
      phone: '+7 (000) 000-00-00'
    })
    
    act(() => {render(<TestAccount />)});
    // Check user card exists on page
    await waitFor(() => expect(screen.getByText(/мой профиль/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/alex bloom/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/alex@example\.com/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('+7 (000) 000-00-00')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('link', { name: /редактировать/i})).toBeInTheDocument());
    expect(screen.getByRole('link', { name: /редактировать/i}).getAttribute('href')).toBe('/account/edit');
  });
});