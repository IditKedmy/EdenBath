import {Redirect} from 'expo-router';
import {useCurrentUserFromState} from 'shared/services';

export default function Index() {
  const user = useCurrentUserFromState();
  return <Redirect href={user ? '/home' : '/login'} />;
}

