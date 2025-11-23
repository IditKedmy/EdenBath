import {create} from 'zustand';
import * as SecureStore from 'expo-secure-store';
import {CurrentUser} from '../../models';

const STORAGE_KEY = 'auth.currentUser';
type CurrentUserState = {
  user: CurrentUser | undefined;
  setUser: (user: CurrentUser | undefined) => void;
  clearUser: () => void;
};

const store = create<CurrentUserState>(set => ({
  user: undefined, // Initialize with undefined; populate asynchronously later
  setUser: (user: CurrentUser | undefined) => {
    set({user});
    (async () => {
      try {
        if (user) {
          await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(user));
        } else {
          await SecureStore.deleteItemAsync(STORAGE_KEY);
        }
      } catch (e) {
        console.error('Error updating secure storage:', e);
      }
    })();
  },
  clearUser: () => {
    set({user: undefined});
    logoutSubscribers.forEach(callback => callback());

    (async () => {
      try {
        await SecureStore.deleteItemAsync(STORAGE_KEY);
      } catch (e) {
        console.error('Error updating secure storage:', e);
      }
    })();
  },
}));

export async function getCurrentUserFromSecureStore(): Promise<CurrentUser | undefined> {
  try {
    const currentUser = await SecureStore.getItemAsync(STORAGE_KEY);
    return currentUser ? (JSON.parse(currentUser) as CurrentUser) : undefined;
  } catch (e) {
    console.error('Error fetching user from secure storage:', e);
    return undefined;
  }
}

export function setCurrentUser(currentUser: CurrentUser | undefined): void {
  const state = store.getState();
  state.setUser(currentUser);
}

export function useCurrentUserFromState(): CurrentUser | undefined {
  return store(state => state.user);
}

/**
 * Initialize the state from SecureStore on app load.
 */
export async function initializeCurrentUser(): Promise<void> {
  const currentUser = await getCurrentUserFromSecureStore();
  const state = store.getState();
  state.setUser(currentUser);
}

// Create a list of logout event subscribers
const logoutSubscribers = new Set<() => void>();

export function subscribeToLogout(callback: () => void): () => void {
  logoutSubscribers.add(callback);
  return () => {
    logoutSubscribers.delete(callback);
  };
}

export function clearCurrentUser() {
  const state = store.getState();
  state.clearUser();
}
