import axios from 'axios';
import TokenService from './token';

const {
  REACT_APP_API_URL: API_URL,
  REACT_APP_API_PREFIX: API_PREFIX,
  REACT_APP_API_VERSION: API_VERSION
} = process.env;
export const baseUrl = `${API_URL}${API_PREFIX}${API_VERSION}`;

const axiosGuest = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
});

axiosGuest.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    // Change error code if failed to refresh access token
    if (error.config.url === '/auth/token/refresh' && error?.response) {
      error.code = 'ACCESS_TOKEN_REFRESH_ERROR'
      error.message = 'Failed to refresh access token'
      TokenService.clear();
    }
    return Promise.reject(error);
  }
)

const axiosJWT = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
});

axiosJWT.interceptors.request.use(
  function (config) {
    if (!config.headers.Authorization && TokenService.isAccessTokenValid()) {
      const token = TokenService.getAccessToken();
      config.headers.Authorization = `Bearer ${token}`;
      }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  });

axiosJWT.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx
    if (error?.response?.status === 401 && error?.config
        && !TokenService.isAccessTokenValid()
        && TokenService.isRefreshTokenValid()
        ) {
          const response = await axiosGuest.post('/auth/token/refresh', {
            refresh: TokenService.getRefreshToken()
          });
          const accessToken = response.data?.access;
          TokenService.updateAccessToken(accessToken || '');
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return axiosJWT(error.config);
    }
    return Promise.reject(error);
  });

export { axiosGuest, axiosJWT };