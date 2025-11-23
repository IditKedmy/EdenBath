import {getCurrentUserFromSecureStore} from 'shared/services';
import {refreshUseCase} from 'pages';
import {isTokenExpired} from './isTokenExpired';

function isLoginRequest(request: Request) {
  if (/\/auth\//.test(request.url) && !/\/auth\/accounts/.test(request.url)) {
    return true;
  }
  return false;
}

export async function requestInterceptor(request: Request) {
  let user = await getCurrentUserFromSecureStore();
  if (user && !isLoginRequest(request)) {
    if (isTokenExpired(user.accessToken)) {
      await refreshUseCase(user.accessToken, user.refreshToken);
      user = await getCurrentUserFromSecureStore();
    }
  }
  if (user && !isLoginRequest(request)) {
    request.headers.append('Authorization', `Bearer ${user.accessToken.trim()}`);
    if (user.id) {
      request.headers.append('X-Account-Id', user.id);
    }
  }
  return request;
}
