import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import nock from 'nock';
import AppProviders from '../../providers/AppProviders';
import App from '../../App';
import { baseUrl } from '../../services/axios';
import { mockJWT, replyHeaders } from '../../test/testHelpers';

const TestApp = () => {
  return (
    <AppProviders>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </AppProviders>
  );
};

const email = 'test@example.com';
const password = 'test123456789';

describe('<Login /> page', () => {
  test('renders correctly', () => {
    act(() => {render(<TestApp />)});
    act(() => {screen.getByRole('link', { name: /вход/i }).click()});
    expect(screen.getByRole('link', { name: /react django users/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /вход/i }).getAttribute('aria-disabled')).toBe('true');
    expect(screen.getByRole('link', { name: /регистрация/i }).getAttribute('aria-disabled')).toBeNull();
    expect(screen.getByRole('heading', { name: /вход/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /адрес электронной почты/i } )).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /забыли пароль\?/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ещё нет аккаунта\?/i })).toBeInTheDocument();
  });
  test('login with 401 and no data in response', async () => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .post('/auth/token/obtain')
    .reply(401, {});
    act(() => {render(<TestApp />)});
    act(() => userEvent.click(screen.getByRole('link', { name: /вход/i })));
    act(() => {
      userEvent.type(
        screen.getByRole('textbox', { name: /адрес электронной почты/i }),
        email
      );
    });
    expect(screen.getByRole('textbox', { name: /адрес электронной почты/i })).toHaveValue(email)
    act(() => {
      userEvent.type(
        screen.getByLabelText(/пароль/i),
        password
      );
    });
    expect(screen.getByLabelText(/пароль/i)).toHaveValue(password)
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /войти/i }));
    });
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(screen.getByText(/неизвестная ошибка/i)).toBeInTheDocument();
  });
  test('login with bad token', async () => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .post('/auth/token/obtain')
    .reply(200, {access: '', refresh: ''});
    act(() => {render(<TestApp />)});
    act(() => {screen.getByRole('link', { name: /вход/i }).click()});
    act(() => {
      userEvent.type(
        screen.getByRole('textbox', { name: /адрес электронной почты/i }),
        email
      );
    });
    expect(screen.getByRole('textbox', { name: /адрес электронной почты/i })).toHaveValue(email)
    act(() => {
      userEvent.type(
        screen.getByLabelText(/пароль/i),
        password
      );
    });
    expect(screen.getByLabelText(/пароль/i)).toHaveValue(password)
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /войти/i }));
    });
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
    expect(screen.getByText(/ошибка токена/i)).toBeInTheDocument();
    expect(screen.getByText(/не удалось прочитать токен доступа/i)).toBeInTheDocument();
  });
  test('user login with no data in response', async () => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .post('/auth/token/obtain')
    .reply(200);
    act(() => {render(<TestApp />)});
    act(() => {screen.getByRole('link', { name: /вход/i }).click()});
    act(() => {
      userEvent.type(
        screen.getByRole('textbox', { name: /адрес электронной почты/i }),
        email
      );
    });
    expect(screen.getByRole('textbox', { name: /адрес электронной почты/i })).toHaveValue(email)
    act(() => {
      userEvent.type(
        screen.getByLabelText(/пароль/i),
        password
      );
    });
    expect(screen.getByLabelText(/пароль/i)).toHaveValue(password)
    act(() => userEvent.click(screen.getByRole('button', { name: /войти/i })));
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
    expect(screen.getByText(/ошибка сервера/i)).toBeInTheDocument();
    expect(screen.getByText(/в ответе нет данных/i)).toBeInTheDocument();
  });
  test('user login and logout correctly', async () => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .post('/auth/token/obtain')
    .reply(200, mockJWT());
    act(() => {render(<TestApp />)});
    act(() => {screen.getByRole('link', { name: /вход/i }).click()});
    act(() => {
      userEvent.type(
        screen.getByRole('textbox', { name: /адрес электронной почты/i }),
        email
      );
    });
    expect(screen.getByRole('textbox', { name: /адрес электронной почты/i })).toHaveValue(email)
    act(() => {
      userEvent.type(
        screen.getByLabelText(/пароль/i),
        password
      );
    });
    expect(screen.getByLabelText(/пароль/i)).toHaveValue(password)
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /войти/i }));
    });
    await waitFor(() => expect(screen.getByText(/dashboard/i)).toBeInTheDocument());
    act(() => userEvent.click(screen.getByRole('button', { name: /profile/i })));
    act(() => userEvent.click(screen.getByRole('menuitem', { name: /выход/i })));
    expect(screen.getByRole('heading', { name: /react django users/i })).toBeInTheDocument();
  });

});
