import { useState } from 'react';
import { TAlert } from '../components/AlertsList';
import { AxiosError } from 'axios';
import { AxiosErrorService } from '../services/error';

/**
 * useResponseError - custom hook to handle http response errors.
 * @returns {{
 * * {AlertType} alerts,
 * * {(newAlerts: AlertType[] | undefined) => void} resetAlerts,
 * * {(error: AxiosError) => void} handleResponseError 
 * }}
 * @ 
 *  * alerts - state with list of alerts to render as MUI Alert components.
 *  * resetAlerts(newAlerts) - function to set/reset alerts state.
 *  * handleResponseError() - function to handle response error and set alerts.
 */
export function useResponseError() {
  const [alerts, setAlerts] = useState<TAlert[]>();

  const resetAlerts = (newAlerts: TAlert[] | undefined = undefined) => {
    if (newAlerts) {
      setAlerts(newAlerts);
    } else if (alerts) {
      setAlerts(undefined);
    }
  };

  const handleResponseError = (error: AxiosError) => {
    setAlerts(new AxiosErrorService(error).alerts);
  };

  return { alerts, resetAlerts, handleResponseError };
}