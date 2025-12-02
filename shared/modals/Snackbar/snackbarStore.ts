import {create} from 'zustand';
import {SeverityTypes} from '../../models';

type SnackbarStore = {
  key: number;
  message: string | null;
  severity: SeverityTypes | null;
  isOpen: boolean;
  open: (message: string, severity: SeverityTypes) => void;
  close: () => void;
};

export const snackbarStore = create<SnackbarStore>(set => ({
  key: 0,
  message: null,
  severity: 'info',
  isOpen: false,
  open: (message: string, severity: SeverityTypes) =>
    set(prevState => ({...prevState, message, severity, isOpen: true, key: prevState.key + 1})),
  close: () => set(prevState => ({...prevState, isOpen: false, message: null})),
}));
