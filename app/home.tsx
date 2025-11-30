import {Redirect} from 'expo-router';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {clearCurrentUser, useCurrentUserFromState} from 'shared/services';

export default function HomeRoute() {
  const user = useCurrentUserFromState();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16}}>
      <Text variant="headlineSmall">Home</Text>
      <Button mode="contained" onPress={() => clearCurrentUser()}>
        Logout
      </Button>
    </View>
  );
}

