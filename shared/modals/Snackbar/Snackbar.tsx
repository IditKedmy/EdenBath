import {Portal, Snackbar as PaperSnackbar, Text} from 'react-native-paper';
import {snackbarStore} from './snackbarStore';
import {colors} from 'theme/colors';

export function Snackbar() {
  const key = snackbarStore(state => state.key);
  const message = snackbarStore(state => state.message);
  const severity = snackbarStore(state => state.severity);
  const isOpen = snackbarStore(state => state.isOpen);
  const close = snackbarStore(state => state.close);
  const color =
    severity === 'error'
      ? colors.error
      : severity === 'warning'
        ? colors.warning
        : severity === 'success'
          ? colors.success
          : colors.secondary;

  return (
    <Portal>
      <PaperSnackbar
        key={key}
        visible={isOpen}
        onDismiss={close}
        duration={4000}
        action={{
          label: 'Close',
          onPress: close,
          textColor: colors.white,
        }}
      >
        <Text style={{color: color}}>{message}</Text>
      </PaperSnackbar>
    </Portal>
  );
}
