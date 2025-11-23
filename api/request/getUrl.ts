import Constants from 'expo-constants';

export function getUrl(url: string) {
  return `${Constants.expoConfig?.extra?.API_URL}/${url}`;
}
