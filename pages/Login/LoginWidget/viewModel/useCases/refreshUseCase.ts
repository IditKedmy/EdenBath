import {refresh} from '../data/repository/refresh';
import {getTokensWrapper} from './getTokensWrapper';
import {NavigationProp} from '@react-navigation/native';
import {StackParamList} from 'navigation';

export async function refreshUseCase(
  accessToken: string,
  refreshToken: string,
  navigation?: NavigationProp<StackParamList>,
): Promise<void> {
  await getTokensWrapper(() => refresh(accessToken, refreshToken), navigation);
}
