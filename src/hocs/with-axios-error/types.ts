import { AxiosError } from 'axios';

export type ErrorObject = { message: string } | null;

export interface IErrorContext {
  error: ErrorObject;
  resetError: () => void;
}

export type ErrorHandler = (error: AxiosError) => Promise<any>;

export type SetError = (error: ErrorObject) => void;
