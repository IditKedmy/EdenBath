import {User} from './user';

export interface CurrentUser extends User {
  accessToken: string;
  refreshToken: string;
}
