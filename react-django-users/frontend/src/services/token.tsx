import * as jose from 'jose';
import { TUser } from '../hooks/useAuthContext';

class Token {

  keys: string[];
  access: string;
  refresh: string;
  
  constructor() {
    this.access = 'access';
    this.refresh = 'refresh';
    this.keys = [this.access, this.refresh];
  }

  isTokenExpired(token: string) {
    const decodedToken = jose.decodeJwt(token);
    const currentTimeStamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp) {
      return decodedToken.exp < currentTimeStamp;
    }
    return true;
  }

  getAccessToken() {
    return localStorage.getItem('access');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh');
  }

  updateAccessToken(token: string) {
    localStorage.setItem('access', token);
  }
  
  updateRefreshToken(token: string) {
    localStorage.setItem('refresh', token);
  }
  
  clear() {
    localStorage.removeItem(this.access);
    localStorage.removeItem(this.refresh);
  }

  isAccessTokenValid() {
    const token = this.getAccessToken();
    return token && !this.isTokenExpired(token);
  }

  isRefreshTokenValid() {
    const token = this.getRefreshToken();
    return token && !this.isTokenExpired(token);
  }

  getAuthContext() {
    if (this.isRefreshTokenValid()) {
      const accessToken = this.getAccessToken();
      if (accessToken) {
        return { role: jose.decodeJwt(accessToken)?.role } as TUser;
      }
    }
    return undefined;
  }
}

const TokenService = new Token();

export default TokenService;