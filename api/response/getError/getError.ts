import {getCustomError} from './getCustomError';

export async function getError(response: Response) {
  let error: string | null = '';
  try {
    const payload = await response.json();
    error =
      getCustomError(payload.errors) ||
      getCustomError(payload.errorCodes) ||
      getCustomError([payload.title]);
    if (!error) {
      error = payload.title || payload.error?.message || payload.message;
    }
  } catch {
    /* empty */
  }
  return error || `${response.status} - ${response.statusText}`;
}
