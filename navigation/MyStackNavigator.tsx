import {StackParamList} from './models/paramList';
import {clearCurrentUser, subscribeToLogout, useCurrentUserFromState} from 'shared/services';
import {Login} from 'pages';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {Button, Text} from 'react-native-paper';

const Stack = createStackNavigator<StackParamList>();

export function MyStackNavigator() {
  const user = useCurrentUserFromState();
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  useEffect(() => {
    //Subscribe to logout event
    return subscribeToLogout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }); //Unsubscribe when component unmounts
    });
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName={user ? 'Home' : 'Login'}
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          cardStyle: {backgroundColor: 'white'},
        }}
      />
    </Stack.Navigator>
  );
}

function Home() {
  return (
    <>
      <Text>Home</Text>
      <Button onPress={() => clearCurrentUser()}>Logout</Button>
    </>
  );
}
