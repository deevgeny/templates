import { renderHook, act } from '@testing-library/react'
import { useErrorContext } from '../useErrorContext';

describe('useErrorContext hook', () => {
  test('initial render', () => {
    const { result } = renderHook(useErrorContext);
    expect(result.current.error).toBeUndefined();
    expect(result.current.setError).not.toBeUndefined();
  });
  test('call default setter function', () => {
    const { result } = renderHook(useErrorContext);
    act(() => {
      result.current.setError({message: {title: 'title', text: 'text'}})
    });
    expect(result.current.error).toBeUndefined();
  });
});