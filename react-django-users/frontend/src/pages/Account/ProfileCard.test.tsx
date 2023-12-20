import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import nock from 'nock';
import ProfileCard from './ProfileCard';
import AppProviders from '../../providers/AppProviders';
import { baseUrl } from '../../services/axios';
import { replyHeaders } from '../../test/testHelpers';

const TestProfileCard = () => {
  return (
    <AppProviders>
      <MemoryRouter>
        <ProfileCard />
      </MemoryRouter>
    </AppProviders>
  );
};

describe('<ProfileCard /> component', () => {
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
    act(() => render(<TestProfileCard />));
    expect(screen.getByText(/мой профиль/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/alex bloom/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/alex@example.com/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('+7 (000) 000-00-00')).toBeInTheDocument());
    expect(screen.getByRole('link', { name: /редактировать/i})).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /редактировать/i}).getAttribute('href')).toBe('/account/edit');
  });
  test('renders correctly with empty data', async () => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .get('/users/me')
    .reply(200, {
      role: 'USER',
      first_name: 'Alex',
      last_name: 'Bloom',
      email: '',
      phone: ''
    });

    act(() => render(<TestProfileCard />));
    expect(screen.getByText(/мой профиль/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/alex bloom/i)).toBeInTheDocument());
    expect(screen.getByRole('link', { name: /редактировать/i})).toBeInTheDocument();
  });
});