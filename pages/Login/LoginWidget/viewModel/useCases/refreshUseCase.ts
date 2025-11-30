import {refresh} from '../data/repository/refresh';
import {getTokensWrapper} from './getTokensWrapper';

export async function refreshUseCase(accessToken: string, refreshToken: string): Promise<void> {
  await getTokensWrapper(() => refresh(accessToken, refreshToken));
}
