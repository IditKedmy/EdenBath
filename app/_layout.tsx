import {Slot, useRouter} from 'expo-router';
import {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppProviders} from 'AppProviders';
import {subscribeToLogout} from 'shared/services';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    return subscribeToLogout(() => {
      router.replace('/login');
    });
  }, [router]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppProviders>
        <Slot />
      </AppProviders>
    </GestureHandlerRootView>
  );
}
