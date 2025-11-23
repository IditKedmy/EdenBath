import api from 'api';
import {TokensResponseDto} from './tokensResponseDto';

export async function refresh(accessToken: string, refreshToken: string) {
  const resp = await api.post<TokensResponseDto>('auth/refresh', {accessToken, refreshToken});
  if (!resp?.accessToken || !resp?.refreshToken) {
    throw new Error('Refresh failed: No token received');
  }
  return resp;
}
