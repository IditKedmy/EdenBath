/* eslint-disable @typescript-eslint/no-explicit-any */
import {getRequest} from './request/getRequest';
import {requestInterceptor} from './request/request.interceptor';
import {processPromise} from './response/processPromise';
import {responseInterceptor} from './response/response.interceptor';
import {delayOnMock} from './delayOnMock';
import {MethodTypes} from './methodTypes';

export async function makeRequest(
  url: string,
  method: MethodTypes,
  body?: any,
  signal?: AbortSignal,
): Promise<any> {
  let request = getRequest(url, method, body, signal);
  request = await requestInterceptor(request);
  const promise = fetch(request);
  const result = await processPromise(promise);
  const response = await responseInterceptor(result);
  await delayOnMock(signal);
  return getFinalizedResponse(method, response);
}

async function getFinalizedResponse(
  method: MethodTypes,
  response?: Response | string | null,
): Promise<any> {
  if (!response || typeof response === 'string') {
    return response;
  }
  try {
    if (method === 'DOWNLOAD') {
      return await response.blob();
    }
    if (response.headers.get('Content-Type')?.includes('text/html')) {
      return await response.text();
    }
    return await response.json();
  } catch {
    return response;
  }
}
