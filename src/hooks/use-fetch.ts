import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface IRequestConfig {
  method?: 'get' | 'post' | 'put' | 'delete';
  body?: Record<string, any>;
  headers?: Record<string, string>;
};

type UseFetchReturnValues = [response: any, makeRequest: () => void];

axios.defaults.baseURL = 'http://localhost:3005';

export const useFetch = (url: string, config: IRequestConfig = {}): UseFetchReturnValues => {
  const { method = 'get', body = null, headers = null } = config;

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const axiosConfig: AxiosRequestConfig = {
    method,
    url,
    cancelToken: source.token,
  };

  if (body) axiosConfig.data = body;
  if (headers) axiosConfig.headers = headers;

  const [response, setResponse] = useState<AxiosResponse>();

  useEffect(() => {
    return () => {
      source.cancel('Request has been canceled!');
    }
  }, [source]);

  const makeRequest = () => {
    axios(axiosConfig)
      .then((res) => {
        setResponse({ ...res })
      })
      .catch(console.error);
  };

  return [response, makeRequest];
};
