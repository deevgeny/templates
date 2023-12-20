import { useState } from 'react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { axiosGuest, axiosJWT } from '../services/axios';
import { useResponseError } from './useResponseError';

/**
 * useAxiosHandler - custom hook to handle axios requests and return response or catch and handle response errors.
 * @returns {{
 *  {AlertType[]} alerts,
 *  {(newAlerts: AlertType[] | undefined) => void} resetAlerts,
 *  {bolean} isFetching,
 *  {AxiosError | undefined} fetchError,
 *  {(config: AxiosRequestConfig, auth: bolean = true) => AxiosResponse | void} requestHandler 
 * }} - with the following properties:
 *  alerts - state with list of alerts to render as MUI Alert components.
 *  resetAlerts(newAlerts) - function to set/reset alerts state.
 *  isFetching - http request status.
 *  fetchError - AxiosError object if fetch error occur.
 *  requestHandler - function to handle axios requests.
 */
export function useAxiosHandler() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<AxiosError>();
  const { alerts, resetAlerts, handleResponseError } = useResponseError();

  const requestHandler = async (
    config: AxiosRequestConfig,
    auth: boolean = true) => {
    try {
      setIsFetching(true);
      if (auth) {
        // Use axiosJWT instance to handle token refresh in interceptors
        const response = await axiosJWT(config);
        setIsFetching(false);
        return response;
      } else {
        // Use axiosGuest instance to skip token refresh for 401 errors
        const response = await axiosGuest(config);
        setIsFetching(false);
        return response;
      }
    } catch(error) {
      if (!config.signal?.aborted) {
        // If condition to handle react strict mode
        setIsFetching(false);
        setFetchError(error as AxiosError)
        handleResponseError(error as AxiosError);
      }
    }
  };

  return { alerts, resetAlerts, isFetching, fetchError, requestHandler };
}