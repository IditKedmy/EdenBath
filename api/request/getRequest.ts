import {getOptions} from './getOptions';
import {getUrl} from './getUrl';
import {MethodTypes} from '../methodTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getRequest(url: string, method: MethodTypes, body?: any, signal?: AbortSignal) {
  const options = getOptions(url, method, signal, body);
  return new Request(getUrl(url), options);
}
