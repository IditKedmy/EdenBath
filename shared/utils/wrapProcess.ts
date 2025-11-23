import {hideLoader, openSnackbar, showLoader} from '../modals';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function wrapProcess(callback: () => Promise<void>, onError?: (error: any) => void) {
  showLoader();
  try {
    await callback();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (onError) {
      onError(e);
    }
    openSnackbar(e.message, 'error');
  } finally {
    hideLoader();
  }
}
