import usersData from './users.json';
import {TokensResponseDto} from './tokensResponseDto';

interface RequestDto {
  nationalId: string;
  phone: string;
  otp: string;
  password: string | null;
}

function base64Encode(str: string): string {
  // Use btoa if available (web/Expo), otherwise use a simple base64 encoder
  if (typeof btoa !== 'undefined') {
    return btoa(str);
  }
  // Fallback for React Native if btoa is not available
  // This is a simple base64 encoder
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let result = '';
  let i = 0;
  while (i < str.length) {
    const a = str.charCodeAt(i++);
    const b = i < str.length ? str.charCodeAt(i++) : 0;
    const c = i < str.length ? str.charCodeAt(i++) : 0;
    const bitmap = (a << 16) | (b << 8) | c;
    result +=
      chars.charAt((bitmap >> 18) & 63) +
      chars.charAt((bitmap >> 12) & 63) +
      (i - 2 < str.length ? chars.charAt((bitmap >> 6) & 63) : '=') +
      (i - 1 < str.length ? chars.charAt(bitmap & 63) : '=');
  }
  return result;
}

function createMockJwt(payload: Record<string, unknown>): string {
  // Create a simple mock JWT token
  const header = base64Encode(JSON.stringify({alg: 'HS256', typ: 'JWT'}));
  const body = base64Encode(JSON.stringify(payload));
  const signature = base64Encode('mock-signature');
  return `${header}.${body}.${signature}`;
}

export async function validateOtp(
  request: RequestDto,
): Promise<TokensResponseDto | undefined | null> {
  // Read from JSON file instead of API call
  const user = usersData.users.find(
    u => u.nationalId === request.nationalId && u.phone === request.phone && u.otp === request.otp,
  );

  if (!user) {
    throw new Error('Invalid OTP or credentials');
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Generate mock tokens
  const accessTokenPayload = {
    id: user.nationalId,
    nameid: user.nationalId,
    nameidentifier: user.nationalId,
    phone: user.phone,
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiry
  };

  const refreshTokenPayload = {
    id: user.nationalId,
    exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours expiry
  };

  return {
    accessToken: createMockJwt(accessTokenPayload),
    refreshToken: createMockJwt(refreshTokenPayload),
  };
}
