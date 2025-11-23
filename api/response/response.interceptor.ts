import {getError} from './getError/getError';
import {clearCurrentUser} from 'shared/services';

export async function responseInterceptor(response?: Response) {
  // Happens only when the request is aborted
  if (response === undefined) {
    return undefined;
  }

  if (response.status === 204) {
    return null;
  }
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 401) {
    clearCurrentUser();
    window.location.href = './';
    return;
  }
  if (response.status === 403) {
    window.alert('Unauthorized access');
  }

  const error = await getError(response);
  throw new Error(error);
}
