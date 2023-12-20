import { renderHook, act } from '@testing-library/react'
import { useResponseError } from '../useResponseError';
import { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { BaseError } from '../../services/error/baseError';

describe('useResponseError hook', () => {
  test('initial render', () => {
    const { result } = renderHook(useResponseError);
    expect(result.current.alerts).toBeUndefined();
    expect(result.current.handleResponseError).not.toBeNull();
    expect(result.current.resetAlerts).not.toBeNull();
  });
  test('set alerts', () => {
    const { result } = renderHook(useResponseError);
    act(() => {
      result.current.resetAlerts([{severity: 'error', message: 'error'}])
    });
    expect(result.current.alerts).toStrictEqual([{severity: 'error', message: 'error'}]);
  });
  test('set and reset alerts', () => {
    const { result } = renderHook(useResponseError);
    act(() => {
      result.current.resetAlerts([{severity: 'error', message: 'error'}])
    });
    act(() => result.current.resetAlerts());
    expect(result.current.alerts).toBeUndefined();
  });
  test('reset empty alerts', () => {
    const { result } = renderHook(useResponseError);
    act(() => result.current.resetAlerts());
    expect(result.current.alerts).toBeUndefined();
  });
  test('handleResponseError with unknown status', () => {
    const { result } = renderHook(useResponseError);
    const error = new AxiosError('test error');
    const resp: AxiosResponse = {
      data: {},
      status: 900,
      statusText: 'OK',
      config: {headers:{} as AxiosRequestHeaders},
      headers: {}
    };
    error.response = resp;
    act(() => {result.current.handleResponseError(error)});
    expect(result.current.alerts)
    .toStrictEqual([{message: new BaseError().unknownText, severity: 'error'}]);
  });
});