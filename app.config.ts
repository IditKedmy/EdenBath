// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export default ({config}) => ({
  ...config,
  extra: {
    ...config.extra,
    API_URL: process.env.EXPO_PUBLIC_API_URL,
    ENV_MODE: process.env.EXPO_PUBLIC_ENV_MODE,
    ENV_NAME: process.env.EXPO_PUBLIC_ENV_NAME,
    IP_URL: process.env.EXPO_PUBLIC_IP_URL,
    MOCK: process.env.EXPO_PUBLIC_MOCK,
    MOCK_DELAY: process.env.EXPO_PUBLIC_MOCK_DELAY,
    eas: {
      projectId: '0e44d5f9-27b3-4479-af04-d0462b0e15e2',
    },
  },
});
