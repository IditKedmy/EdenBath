import {User} from 'shared/models';

export function decodeJwt(token: string): User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let decoded = {} as any;
  try {
    decoded = parseJwt(token);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw Error('Invalid token');
  }

  replaceKey(decoded, 'nameid', 'id');
  replaceKey(decoded, 'nameidentifier', 'id');

  return decoded as User;
}

function replaceKey(obj: Record<string, unknown>, oldKey: string, newKey: string) {
  if (!(oldKey in obj)) {
    return;
  }
  if (oldKey !== newKey) {
    Object.defineProperty(
      obj,
      newKey,
      Object.getOwnPropertyDescriptor(obj, oldKey) as PropertyDescriptor,
    );
    delete obj[oldKey];
  }
}

const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(c => `%${c.charCodeAt(0).toString(16)}`)
      .join(''),
  );
  const res = JSON.parse(jsonPayload);
  for (const key in res) {
    const val = res[key];
    const newKey = key.replace(/^.+\/([a-z][a-z0-9]+)$/i, '$1').trim();
    res[newKey] = val;
  }
  return res as never;
};
