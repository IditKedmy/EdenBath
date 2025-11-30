import {useRef, useState} from 'react';
import {loginUseCase} from './viewModel/useCases/loginUseCase';
import {wrapProcess} from 'shared/utils';
import {LoginSubmitRequest} from './viewModel/models';
import {validateOtpUseCase} from './viewModel/useCases/validateOtpUseCase';
import {useRouter} from 'expo-router';

export function useLoginWidgetViewModel() {
  const router = useRouter();
  const [loginRequested, setLoginRequested] = useState(false);
  const loginRequestRef = useRef<LoginSubmitRequest | undefined>(undefined);

  async function handleLoginSubmit(formRequest: LoginSubmitRequest) {
    const act = async () => {
      await loginUseCase(formRequest);
      setLoginRequested(true);
      loginRequestRef.current = formRequest;
    };
    await wrapProcess(act);
  }

  async function handleOtpSubmit(otp: string) {
    if (!loginRequestRef.current) return;
    const act = async () => {
      await validateOtpUseCase({
        nationalId: loginRequestRef.current!.nationalId || '',
        phone: loginRequestRef.current!.phone || '',
        otp,
        password: null,
      });

      router.replace('/home');
      setLoginRequested(false);
    };
    await wrapProcess(act);
  }

  async function handleResendLogin() {
    if (!loginRequestRef.current) return;
    await handleLoginSubmit(loginRequestRef.current);
  }

  function handleGoBack() {
    setLoginRequested(false);
  }

  return {
    isStartFromScratch: !loginRequested,
    handleLoginSubmit,
    handleOtpSubmit,
    handleResendLogin,
    handleGoBack,
  };
}
