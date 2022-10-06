import { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export function isAuthHeaderSaved(): boolean {
  return Boolean(Cookies.get('authHeaders'));
}

export function setAuthHeaders(requestConfig: AxiosRequestConfig) {
  const rawAuthHeaders = Cookies.get('authHeaders');
  if (!rawAuthHeaders) {
    return requestConfig;
  }

  const authHeaders = JSON.parse(rawAuthHeaders);
  requestConfig.headers = {
    client: authHeaders['client'],
    'access-token': authHeaders['access-token'],
    uid: authHeaders['uid'],
    'token-type': authHeaders['token-type'],
    expiry: authHeaders['expiry'],
  };

  return requestConfig;
}

export function saveAuthHeaders(resp: AxiosResponse) {
  if (resp.headers['access-token']) {
    Cookies.set(
      'authHeaders',
      JSON.stringify({
        'access-token': resp.headers['access-token'],
        client: resp.headers['client'],
        uid: resp.headers['uid'],
        'token-type': resp.headers['token-type'],
        expiry: resp.headers['expiry'],
      }),
      { expires: 7 },
    );
  }

  return resp;
}
