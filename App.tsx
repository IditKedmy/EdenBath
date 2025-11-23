import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import * as Sentry from '@sentry/react-native';
// import * as Updates from 'expo-updates';
import {AppProviders} from 'AppProviders';
import {MyStackNavigator} from 'navigation';

/*Sentry.init({
  dsn: 'https://4eb39f296bdded136590e99631a9b74c@o4509580564299776.ingest.de.sentry.io/4509580568494160',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
  enableNative: true,
  debug: true,
});*/

// eslint-disable-next-line react-refresh/only-export-components
/*export default Sentry.wrap(function App() {
  Sentry.captureMessage(
    `updates: isEnabled=${Updates.isEnabled}, channel=${Updates.channel}, runtime=${Updates.runtimeVersion}`,
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppProviders>
        <AppTest/>
      </AppProviders>
    </GestureHandlerRootView>
  );
});*/

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppProviders>
        <MyStackNavigator />
      </AppProviders>
    </GestureHandlerRootView>
  );
}
