import { renderHook, act } from '@testing-library/react'
import { useAuthContext } from '../useAuthContext'

describe('useAuthContext hook', () => {
  test('initial render', () => {
    const { result } = renderHook(useAuthContext);
    expect(result.current.user).toBe(undefined);
    expect(result.current.setUser.name).toBe('setUser');
  });
  test('call setUser default context function', () => {
    const { result } = renderHook(useAuthContext);
    act(() => {result.current.setUser(undefined)});
  });
});