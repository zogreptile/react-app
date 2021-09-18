import { useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, Cancel, AxiosError } from 'axios';

import { SetError } from './types';

export const responseCache = new Map();

export const useInterceptors = (setError: SetError) => {
  const errorHandler = useCallback((error: AxiosError) => {
    if (axios.isCancel(error)) {
      // запрос был отменён в интерцепторе — резолвим закэшированный ответ
      return Promise.resolve(responseCache.get(error.message));
    }

    setError({
      message: error.response ? error.response.data.message : error.message
    });

    return Promise.reject(error.response || error);
  }, [setError]);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      requestInterceptorHandler,
      errorHandler,
    );
  
    const responseInterceptor = axios.interceptors.response.use(
      responseInterceptorHandler,
      errorHandler,
    );
  
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [errorHandler]);
}

function requestInterceptorHandler(req: AxiosRequestConfig): AxiosRequestConfig | Cancel {
  if (responseCache.has(req.url)) {
    throw new axios.Cancel(req.url);
  }

  return req;
};

function responseInterceptorHandler(res: AxiosResponse): AxiosResponse {
  const requestMethod = res.config.method?.toLowerCase();
  const isCachedResponse = responseCache.has(res.config.url);

  if (requestMethod === 'get' && !isCachedResponse) {
    responseCache.set(res.config.url, res);
  }

  return res;
}
