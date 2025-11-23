/* eslint-disable @typescript-eslint/no-explicit-any */
import {makeRequest} from './makeRequest';
import {getUrl} from './request/getUrl';
import * as FileSystem from 'expo-file-system/legacy';
import {shareAsync} from 'expo-sharing';
import {Platform} from 'react-native';
import {getCurrentUserFromSecureStore} from 'shared/services';
import {hideLoader, showLoader} from 'shared/modals';

interface Api {
  get(url: string, signal?: AbortSignal): Promise<any>;
  get<T>(url: string, signal?: AbortSignal): Promise<T | null | undefined>;
  put(url: string, body: any, signal: AbortSignal): Promise<any>;
  put<T>(url: string, body: any, signal: AbortSignal): Promise<T | null | undefined>;
  patch(url: string, body: any, signal?: AbortSignal): Promise<any>;
  patch<T>(url: string, body: any, signal?: AbortSignal): Promise<T | null | undefined>;
  post(url: string, body: any, signal?: AbortSignal): Promise<any>;
  post<T>(url: string, body: any, signal?: AbortSignal): Promise<T | null | undefined>;
  delete(url: string, signal?: AbortSignal): Promise<any>;
  delete<T>(url: string, signal?: AbortSignal): Promise<T | null | undefined>;
  upload(url: string, body: any, signal?: AbortSignal): Promise<any>;
  upload<T>(url: string, body: any, signal?: AbortSignal): Promise<T | null | undefined>;
  download(url: string, signal?: AbortSignal): Promise<any>;
  download<T>(url: string, signal?: AbortSignal): Promise<T | null | undefined>;
}

const api: Api = {
  get: async (url: string, signal: AbortSignal): Promise<any> =>
    makeRequest(url, 'GET', undefined, signal),
  put: async (url: string, body: any, signal: AbortSignal): Promise<any> =>
    makeRequest(url, 'PUT', body, signal),
  patch: async (url: string, body: any, signal: AbortSignal): Promise<any> =>
    makeRequest(url, 'PATCH', body, signal),
  post: async (url: string, body: any, signal?: AbortSignal): Promise<any> =>
    makeRequest(url, 'POST', body, signal),
  delete: async (url: string, signal?: AbortSignal): Promise<any> =>
    makeRequest(url, 'DELETE', undefined, signal),
  upload: async (url: string, body: any, signal?: AbortSignal): Promise<any> =>
    makeRequest(url, 'UPLOAD', body, signal),

  download: async (relativeUrl: string): Promise<'success' | 'error'> => {
    showLoader();

    try {
      const fullUrl = getUrl(relativeUrl);
      const user = await getCurrentUserFromSecureStore();

      const headers: Record<string, string> = {};
      if (user?.accessToken) headers['Authorization'] = `Bearer ${user.accessToken.trim()}`;
      if (user?.id) headers['X-Account-Id'] = user.id;

      const fileName = relativeUrl.split('/').pop() || 'download.bin';
      const docDir = (FileSystem as any).documentDirectory ?? '';
      const localUri = docDir + fileName;

      const result = await FileSystem.downloadAsync(fullUrl, localUri, {headers});

      if (!result || result.status !== 200) {
        hideLoader();
        return 'error';
      }

      if (Platform.OS === 'android') {
        const permissions = await (
          FileSystem as any
        ).StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(result.uri, {
            encoding: (FileSystem as any).EncodingType.Base64,
          });

          const contentType =
            result.headers?.['content-type'] ??
            result.headers?.['Content-Type'] ??
            'application/octet-stream';

          const destUri = await (FileSystem as any).StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            fileName,
            contentType,
          );

          await FileSystem.writeAsStringAsync(destUri, base64, {
            encoding: (FileSystem as any).EncodingType.Base64,
          });
          return 'success';
        } else {
          return 'error';
        }
      } else {
        await shareAsync(result.uri);
        return 'success';
      }
    } catch (error) {
      console.warn('Download error:', error);
      hideLoader();
      return 'error';
    } finally {
      hideLoader();
    }
  },
};

export default api;
