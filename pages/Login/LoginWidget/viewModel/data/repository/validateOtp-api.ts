import api from 'api';
import {TokensResponseDto} from './tokensResponseDto';

interface RequestDto {
  nationalId: string;
  phone: string;
  otp: string;
  password: string | null;
}

export async function validateOtp(
  request: RequestDto,
): Promise<TokensResponseDto | undefined | null> {
  return await api.post<TokensResponseDto>('auth/validate-otp', request);
}
