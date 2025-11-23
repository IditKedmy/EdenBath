import {LoginSubmitRequest} from './loginSubmitRequest';

export interface OtpSubmitRequest extends LoginSubmitRequest {
  otp: string;
  password: string | null;
}
