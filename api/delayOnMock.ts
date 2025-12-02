import Constants from 'expo-constants';

export async function delayOnMock(signal: AbortSignal | undefined) {
  if (
    Constants.expoConfig?.extra?.ENV_NAME !== 'development' ||
    Constants.expoConfig?.extra?.MOCK !== 'true' ||
    !Constants.expoConfig?.extra?.MOCK_DELAY
  ) {
    return;
  }
  console.log('Delaying mock response...');
  const delay = parseInt(Constants.expoConfig?.extra?.MOCK_DELAY);
  if (!delay) {
    return;
  }
  const timeoutRef: {current: NodeJS.Timeout} = {
    current: 0 as unknown as NodeJS.Timeout,
  };
  signal?.addEventListener('abort', () => {
    clearTimeout(timeoutRef.current);
  });
  await new Promise(resolve => {
    timeoutRef.current = setTimeout(resolve, delay);
  });
}
