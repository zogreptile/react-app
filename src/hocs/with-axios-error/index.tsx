import React, { useState, createContext, useCallback } from 'react';

import { useInterceptors } from './use-interceptors';
import { IErrorContext, ErrorObject } from './types';

export const AxiosErrorContext = createContext<IErrorContext>({ error: null, resetError: () => {}});

export const withAxiosError = (Component: React.FC): React.FC => (props: any) => {
  const [axiosError, setError] = useState<ErrorObject>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  useInterceptors(setError);

  return (
    <AxiosErrorContext.Provider value={{ error: axiosError, resetError }}>
      <Component {...props}/>
    </AxiosErrorContext.Provider>
  );
}
