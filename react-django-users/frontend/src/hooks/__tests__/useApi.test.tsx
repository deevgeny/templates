import { renderHook, act } from '@testing-library/react'
import { useApi } from '../useApi';
import nock from 'nock';
import { baseUrl } from '../../services/axios';

const replyHeaders = {
  'Content-Type': 'application/json',
  'access-control-allow-origin': '*',
};

describe('useApi hook', () => {
  const controller = new AbortController();
  test('initial render', () => {
    const { result } = renderHook(useApi);
    expect(result.current.api).not.toBeNull();
    expect(result.current.alerts).toBeUndefined();
    expect(result.current.resetAlerts).not.toBeNull();
    expect(result.current.isFetching).toBe(false);
    expect(result.current.fetchError).toBeUndefined();
  });
  test('available api endpoints', () => {
    const endpoints = [
      'login',
      'register',
      'getProfile',
      'updateProfile',
      'changePassword'
    ];
    const { result } = renderHook(useApi);
    expect(Object.keys(result.current.api)).toStrictEqual(endpoints);
  });
  test('login endpoint', async () => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .post('/auth/token/obtain')
    .reply(200, { 'access': '', 'refresh': '' });
    const { result } = renderHook(useApi);
    const response = await act(() => {
      const response = result.current.api.login(
        controller,
        {email: 'test@example.com', password: 'password'}
      );
      return response;
    });
    expect(response?.status).toBe(200);
  });
  test('login endpoint default error for 401', async () => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .post('/auth/token/obtain')
    .reply(401, {});
    const { result } = renderHook(useApi);
    const response = await act(() => {
      const response = result.current.api.login(
        controller,
        {email: 'test@example.com', password: 'password'}
      );
      return response;
    });
    expect(result.current.fetchError).not.toBeUndefined();
    expect(result.current.alerts).toStrictEqual([{
      severity: 'error', message: 'Неизвестная ошибка'
    }]);
  });
  test('register endpoint', async () => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .post('/users')
    .reply(200);
    const { result } = renderHook(useApi);
    const response = await act(() => {
      const response = result.current.api.register(
        controller,
        {email: 'test@example.com', password: 'password'}
      );
      return response;
    });
    expect(response?.status).toBe(200);
  });
  test('getProfile endpoint', async () => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .get('/users/me')
    .reply(200, {
      'first_name': 'f',
      'last_name': 'l',
      'role': 'USER',
      'phone': '',
      'email': 'test@example.com'
    })
    const { result } = renderHook(useApi);
    const response = await act(() => {
      const response = result.current.api.getProfile(
        controller,
      );
      return response;
    });
    expect(response?.status).toBe(200);
  });
  test('updateProfile endpoint', async () => {
    const { result } = renderHook(useApi);
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .options('/users/me').reply(200).patch('/users/me').reply(200);
    const response = await act(() => {
      const response = result.current.api.updateProfile(
        controller,
        {}
      );
      return response;
    });
    expect(response?.status).toBe(200);
  });
  test('changePassword endpoint', async () => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .post('/users/change-password')
    .reply(200);
    const { result } = renderHook(useApi);
    const response = await act(() => {
      const response = result.current.api.changePassword(
        controller,
        {}
      );
      return response;
    });
    expect(response?.status).toBe(200);
  });
});