import {ReactNode, useEffect, useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';
import {Loader, Popup, Snackbar} from 'shared/modals';
import {theme} from 'theme/theme';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {hideLoader, showLoader} from 'shared/modals';
import {initializeCurrentUser} from 'shared/services';

type Props = {
  children: ReactNode;
};

export function AppProviders({children}: Props) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await initializeCurrentUser();
        setIsReady(true);
      } catch (e) {
        console.error('Initialization error:', e);
      }
    })();
  }, []);

  if (!isReady) {
    showLoader();
    return null;
  } else {
    hideLoader();
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <SafeAreaView edges={['top', 'left', 'right']} style={{flex: 1}}>
        <PaperProvider
          theme={theme}
          settings={{
            icon: props => <MaterialCommunityIcons {...props} />,
          }}
        >
          <NavigationContainer>{children}</NavigationContainer>
          <Popup />
          <Loader />
          <Snackbar />
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
