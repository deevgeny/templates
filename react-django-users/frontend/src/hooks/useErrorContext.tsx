import { AxiosError } from 'axios';
import React, { createContext, useContext } from 'react';
import { TErrorMessage } from '../services/error/baseError';

export type TError = {
  message?: TErrorMessage;
  object?: AxiosError;
};

interface TErrorContext {
  error: TError | undefined;
  setError: (React.Dispatch<React.SetStateAction<TError | undefined>>);
};

const defaultState = {
  error: undefined,
  setError: () => {}
};

export const ErrorContext = createContext<TErrorContext>(defaultState);

/**
 useErrorContext - custom hook to simplify access to error context in components.
 @params no params
 @returns {{
  error,
  setError }} - ErrorContext object with the following properties:
  error - useState hook value (error object).
  setError - useState setter function.  
 */
export function useErrorContext() {
  return useContext(ErrorContext);
}