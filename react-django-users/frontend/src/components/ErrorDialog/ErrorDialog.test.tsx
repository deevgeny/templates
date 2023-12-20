import { render, screen, act } from '@testing-library/react';
import ErrorDialog from './ErrorDialog';
import { ErrorContext, TError } from '../../hooks/useErrorContext';
import { AxiosError } from 'axios';

describe('<ErrorDialog /> component', () => {
  test('should be closed', () => {
    render(
      <ErrorContext.Provider value={{ error: undefined, setError: () => {} }}>
        <ErrorDialog />
      </ErrorContext.Provider>
    );
    const dialog = screen.queryByRole('dialog');
    expect(dialog).toBe(null);

  });
  test('should be opened and display simple error message', () => {
    const error: TError = {message: {title: 'title', text: 'text'}};
    render(
      <ErrorContext.Provider value={{ error: error, setError: () => {} }}>
        <ErrorDialog />
      </ErrorContext.Provider>
    );
    const dialog = screen.getByRole('dialog');
    const title = screen.getByRole('heading');
    const text = screen.getByText(/text/i);
    const button = screen.getByRole('button');
    expect(dialog).toBeInTheDocument();
    expect(title.textContent).toBe('title');
    expect(text).toBeInTheDocument();
    expect(button.textContent).toBe('Назад');
  });
  test('should be opened and display specific AxiosError message', () => {
    const error: TError = {object: new AxiosError('message', 'ERR_NETWORK')};
    render(
      <ErrorContext.Provider value={{ error: error, setError: () => {} }}>
        <ErrorDialog />
      </ErrorContext.Provider>
    );
    const dialog = screen.getByRole('dialog');
    const title = screen.getByRole('heading');
    const text = screen.getByText(/не удалось загрузить ресурс/i);
    const button = screen.getByRole('button');
    expect(dialog).toBeInTheDocument();
    expect(title.textContent).toBe('Ошибка сети');
    expect(text).toBeInTheDocument();
    expect(button.textContent).toBe('Назад');
  });
  test('should be opened and display default AxiosError message', () => {
    const error: TError = {object: new AxiosError('message', 'NO_CODE')};
    render(
      <ErrorContext.Provider value={{ error: error, setError: () => {} }}>
        <ErrorDialog />
      </ErrorContext.Provider>
    );
    const dialog = screen.getByRole('dialog');
    const title = screen.getByRole('heading');
    const text = screen.getByText(/неизвестная ошибка/i);
    const button = screen.getByRole('button');
    expect(dialog).toBeInTheDocument();
    expect(title.textContent).toBe('Ошибка');
    expect(text).toBeInTheDocument();
    expect(button.textContent).toBe('Назад');
  });
  test('should be opened and setError called by button click', () => {
    const setError = jest.fn();
    const error: TError = {object: new AxiosError('message', 'NO_CODE')};
    act(() => {
      render(
        <ErrorContext.Provider value={{ error: error, setError: setError }}>
          <ErrorDialog />
        </ErrorContext.Provider>);
    });
    const button = screen.getByRole('button');
    act(() => button.click());
    expect(setError).toHaveBeenCalledTimes(1);
  });
});