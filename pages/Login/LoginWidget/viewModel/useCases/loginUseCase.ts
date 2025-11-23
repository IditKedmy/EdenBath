import {LoginSubmitRequest} from '../models';
import {login} from '../data/repository/login';

export async function loginUseCase(formRequest: LoginSubmitRequest): Promise<void> {
  await login({
    nationalId: formRequest.nationalId || '',
    phone: formRequest.phone || '',
  });
}
