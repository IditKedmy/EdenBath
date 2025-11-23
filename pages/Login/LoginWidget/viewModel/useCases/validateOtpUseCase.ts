import {OtpSubmitRequest} from '../models';
import {validateOtp} from '../data/repository/validateOtp';
import {getTokensWrapper} from './getTokensWrapper';

export async function validateOtpUseCase(formRequest: OtpSubmitRequest): Promise<void> {
  const response = await validateOtp({
    nationalId: formRequest.nationalId || '',
    phone: formRequest.phone || '',
    otp: formRequest.otp,
    password: formRequest.password || null,
  });

  if (response === null || response === undefined) {
    return;
  }

  await getTokensWrapper(undefined, response);
}
