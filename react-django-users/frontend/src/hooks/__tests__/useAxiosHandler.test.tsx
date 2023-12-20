import { renderHook, act } from '@testing-library/react'
import nock from 'nock';
import { useAxiosHandler } from '../useAxiosHandler';
import { baseUrl } from '../../services/axios';
import { AxiosError } from 'axios';

const replyHeaders = {
  'Content-Type': 'application/json',
  'access-control-allow-origin': '*',
};

describe('useAxiosHandler hook', () => {
  test('initial render', () => {
    const { result } = renderHook(useAxiosHandler);
    expect(result.current.alerts).toBeUndefined();
    expect(result.current.resetAlerts).not.toBeNull();
    expect(result.current.isFetching).toBeFalsy();
    expect(result.current.fetchError).toBeUndefined();
    expect(result.current.requestHandler).not.toBeNull();
  });
  test('successful request', async () => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .get('/users/me')
    .reply(200);
    const { result } = renderHook(useAxiosHandler);
    const response = await act(() => {
      return result.current.requestHandler(
        {url: '/users/me', method: 'get'},
        false
      );
    });
    expect(response?.status).toBe(200);
    expect(result.current.alerts).toBeUndefined();
    expect(result.current.fetchError).toBeUndefined();
  });
  test('400 error', async () => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .get('/users/me')
    .reply(400, {});
    const { result } = renderHook(useAxiosHandler);
    const response = await act(() => {
      return result.current.requestHandler(
        {url: '/users/me', method: 'get'},
        false
      );
    });
    expect(response).toBeUndefined();
    expect(result.current.fetchError).toBeInstanceOf(AxiosError);
    expect(result.current.fetchError?.response?.status).toBe(400);
    expect(result.current.alerts).toStrictEqual([]);
  });
  test('401 error', async () => {
    nock(baseUrl)
    .defaultReplyHeaders(replyHeaders)
    .get('/users/me')
    .reply(401, {});
    const { result } = renderHook(useAxiosHandler);
    const response = await act(() => {
      return result.current.requestHandler(
        {url: '/users/me', method: 'get'},
        false
      );
    });
    expect(response).toBeUndefined();
    expect(result.current.fetchError).toBeInstanceOf(AxiosError);
    expect(result.current.fetchError?.response?.status).toBe(401);
    expect(result.current.alerts)
    .toStrictEqual([{severity: 'error', message: 'Неизвестная ошибка'}]);
  });
});