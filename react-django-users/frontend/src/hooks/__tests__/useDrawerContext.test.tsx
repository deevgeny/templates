import { renderHook, act } from '@testing-library/react'
import { useDrawerContext } from '../useDrawerContext';

describe('useDrawerContext hook', () => {
  test('initial render', () => {
    const { result } = renderHook(useDrawerContext);
    expect(result.current.open).toBeFalsy();
    expect(result.current.setOpen).not.toBeUndefined();
  });
  test('call default setter function', () => {
    const { result } = renderHook(useDrawerContext);
    act(() => {result.current.setOpen(true)});
    expect(result.current.open).toBeFalsy();
  });
});