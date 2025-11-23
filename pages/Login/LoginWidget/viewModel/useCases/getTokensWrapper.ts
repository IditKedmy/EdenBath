import {decodeJwt} from '../data/decodeJwt/decodeJwt';
import {clearCurrentUser, setCurrentUser} from 'shared/services';
import {TokensResponseDto} from '../data/repository/tokensResponseDto';
import {CurrentUser} from 'shared/models';
import {hideLoader} from 'shared/modals';

export async function getTokensWrapper(
  action?: () => Promise<TokensResponseDto>,
  tokensRes?: TokensResponseDto,
): Promise<void> {
  try {
    let tokens;
    if (tokensRes) {
      tokens = tokensRes;
    } else {
      if (!action) {
        throw new Error('No action provided');
      }
      tokens = await action();
    }
    const user = decodeJwt(tokens.accessToken);

    setCurrentUser({
      ...user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    } as CurrentUser);
  } catch (e) {
    console.error('Error while getting tokens', e);
    hideLoader();
    clearCurrentUser();
    throw e;
  }
}
