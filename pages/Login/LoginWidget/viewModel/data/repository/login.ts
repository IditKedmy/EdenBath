import api from 'api';

interface RequestDto {
  nationalId: string;
  phone: string;
}
export async function login(request: RequestDto): Promise<void> {
  await api.post('auth/request-otp', request);
}
