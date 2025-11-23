export function isTokenExpired(accessToken: string) {
  const token = JSON.parse(atob(accessToken.split('.')[1]));
  const now = new Date();
  return token.exp * 1000 < now.getTime();
}
