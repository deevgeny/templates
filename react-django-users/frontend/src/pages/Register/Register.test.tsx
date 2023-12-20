import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import nock from 'nock';
import AppProviders from '../../providers/AppProviders';
import App from '../../App';
import { baseUrl } from '../../services/axios';
import { replyHeaders } from '../../test/testHelpers';

const TestAppRender = () => {
  return (
    <AppProviders>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </AppProviders>
  );
};

const user = {
  firstName: 'John',
  lastName: 'Drake',
  email: 'drake@example.com',
  password: 'test123456789',
  repeatPassword: 'test123456789'
};

const alertMessage = 'Поздравляем с успешной регистрацией! Через несколько секунд вы будете перенаправлены на страницу авторизации.';

describe('<Register /> page', () => {
  test('renders correctly', () => {
    act(() => render(<TestAppRender />));
    act(() => screen.getByRole('link', { name: /регистрация/i }).click());
    expect(screen.getByRole('link', { name: /react django users/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /вход/i }).getAttribute('aria-disabled')).toBeNull();
    expect(screen.getByRole('link', { name: /регистрация/i }).getAttribute('aria-disabled')).toBe('true');
    expect(screen.getByRole('heading', { name: /регистрация/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /имя/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /фамилия/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /адрес электронной почты/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/повтор пароля/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /зарегистрироваться/i })).toBeInTheDocument();
  });
  test('register successfully', async() => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .post('/users')
    .reply(201);
    act(() => render(<TestAppRender />));
    act(() => userEvent.click(screen.getByRole('link', { name: /регистрация/i })));
    act(() => {
      userEvent.type(
        screen.getByRole('textbox', { name: /имя/i }),
        user.firstName
      );
    });
    act(() => {
      userEvent.type(
        screen.getByRole('textbox', { name: /фамилия/i }),
        user.lastName
      );
    });
    act(() => {
      userEvent.type(
        screen.getByRole('textbox', { name: /адрес электронной почты/i }),
        user.email
      );
    });
    act(() => {
      userEvent.type(
        screen.getByLabelText(/пароль/i),
        user.password
      );
    });
    act(() => {
      userEvent.type(
        screen.getByLabelText(/повтор пароля/i),
        user.repeatPassword
      );
    });
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));
    });
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(alertMessage));
  });
  test('register with 401 error', async() => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .post('/users')
    .reply(401, { 'email': ['user with this email address already exists.'] });
    act(() => render(<TestAppRender />));
    act(() => userEvent.click(screen.getByRole('link', { name: /регистрация/i })));
    act(() => {
      userEvent.type(
        screen.getByRole('textbox', { name: /имя/i }),
        user.firstName
      );
    });
    act(() => {
      userEvent.type(
        screen.getByRole('textbox', { name: /фамилия/i }),
        user.lastName
      );
    });
    act(() => {
      userEvent.type(
        screen.getByRole('textbox', { name: /адрес электронной почты/i }),
        user.email
      );
    });
    act(() => {
      userEvent.type(
        screen.getByLabelText(/пароль/i),
        user.password
      );
    });
    act(() => {
      userEvent.type(
        screen.getByLabelText(/повтор пароля/i),
        user.repeatPassword
      );
    });
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));
    });
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Неизвестная ошибка'));
  });
});
