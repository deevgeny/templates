import React, { useState } from 'react';
import { ErrorContext, TError } from '../../hooks/useErrorContext';

type ErrorProviderProps = {
  children: React.ReactNode
};

function ErrorProvider({ children }: ErrorProviderProps) {
  const [error, setError] = useState<TError | undefined>();

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export default ErrorProvider;