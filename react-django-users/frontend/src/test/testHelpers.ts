import jwt from 'jsonwebtoken';

/**
 * replyHeaders function returns default headers for nock library.
 */
export const replyHeaders = {
  'Content-Type': 'application/json',
  'access-control-allow-origin': '*',
};

/**
 * mockJWT - helper function returns JWT pair for mock response.
 * @returns {object} { access: string, refresh: string }
 */
export const mockJWT = (): {} => {
  const SECRET_KEY = 'DLL2nW3h8ItrVcxFMqqJTsnVHY93FzXh';
  const accessClaim = {
    'user_id': 1,
    'role': 'USER',
    'token_type': 'access',
    'iat': Math.floor(Date.now() / 1000),
    'exp': Math.floor(Date.now() / 1000) + 1000,
    'jti': '1525673b385c4c0d967ca030858be9c3',
  };
  const refreshClaim = {
    'user_id': 1,
    'role': 'USER',
    'token_type': 'access',
    'iat': Math.floor(Date.now() / 1000),
    'exp': Math.floor(Date.now() / 1000) + 1000,
    'jti': '4603eb486974466f8eb3475c4af927d3',
  };
  return {
    access: jwt.sign(accessClaim, SECRET_KEY),
    refresh: jwt.sign(refreshClaim, SECRET_KEY)
  };
};

