import {snackbarStore} from './snackbarStore';

export {Snackbar} from './Snackbar';
export const openSnackbar = snackbarStore.getState().open;

export function useSnackbarMessage(): string | null {
  return snackbarStore(state => state.message);
}
