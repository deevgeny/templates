import { useAxiosHandler } from "./useAxiosHandler";

export type RequestData = {
  [key: string]: any
};

/**
 * useApi - custom hook to enable simple use of API endpoints.
 * @returns {{
 *  {object} api,
 *  {AlertType[]} alerts,
 *  {(newAlerts: AlertType[] | undefined) => void} resetAlerts,
 *  {bolean} isFetching,
 *  {AxiosError | undefined} fetchError,
 * }} -  with the following properties:
 *  api - object wrapper for fetch functions with requestHandler. 
 *  alerts - state with list of alerts to render as MUI Alert components.
 *  resetAlerts(newAlerts) - function to set/reset alerts state.
 *  handleResponseError() - function to handle response error and set alerts.
 */
export function useApi() {
  const {
    alerts, resetAlerts, isFetching, fetchError,requestHandler
  } = useAxiosHandler();

  const api = {
    login: (controller: AbortController, data: RequestData) => {
      // Obtain access and refresh tokens pair.
      return requestHandler( 
        { 
          method: 'post',
          url: '/auth/token/obtain',
          data,
          signal: controller.signal
        },
        false
    )},
    register: (controller: AbortController, data: RequestData) => {
      // New user registraion.
      return requestHandler( 
        { 
          method: 'post',
          url: '/users',
          data,
          signal: controller.signal
        },
        false
    )},
    getProfile: (controller: AbortController) => {
      // Get user personal data.
      return requestHandler( 
        { 
          method: 'get',
          url: '/users/me',
          signal: controller.signal
        }
    )},
    updateProfile: (controller: AbortController, data: RequestData) => {
      // Update user personal data.
      return requestHandler( 
        { 
          method: 'patch',
          url: '/users/me',
          data,
          signal: controller.signal
        }
      )},
    changePassword: (controller: AbortController, data: RequestData) => {
      // Change user password
      return requestHandler( 
        { 
          method: 'post',
          url: '/users/change-password',
          data,
          signal: controller.signal
        }
      )},
  }

  return { api, alerts, resetAlerts, isFetching, fetchError };
}