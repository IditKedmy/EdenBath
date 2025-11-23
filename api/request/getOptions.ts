/* eslint-disable @typescript-eslint/no-explicit-any */
import {MethodTypes} from '../methodTypes';

export function getOptions(url: string, method: MethodTypes, signal?: AbortSignal, body?: any) {
  let contentType = 'application/json';
  let methodToUse = method;

  if (method === 'DOWNLOAD') {
    methodToUse = 'GET';
    contentType = 'application/octet-stream';
  }

  if (method === 'UPLOAD') {
    methodToUse = 'POST';
    contentType = 'application/x-www-form-urlencoded';
  }

  if (/profile\/avatar/.test(url)) {
    methodToUse = 'POST';
    contentType = 'multipart/form-data';
  }

  const options: RequestInit = {
    method: methodToUse,
    headers: {
      'Content-Type': contentType,
    },
    signal,
  } as RequestInit;

  if (body) {
    if (/profile\/avatar/.test(url)) {
      const formData = new FormData();
      if (Array.isArray(body.files)) {
        body.files.forEach((file: string, index: number) => {
          formData.append('files', {
            uri: file,
            type: 'image/jpeg',
            name: `avatar_${index}.jpg`,
          } as any);
        });
      }
      options.body = formData;
    } else {
      options.body = JSON.stringify(body);
    }
  }

  return options;
}
