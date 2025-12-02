import {create} from 'zustand';

type LoaderStore = {
  key: number;
  isOpen: boolean;
  show: () => void;
  hide: () => void;
};

export const loaderStore = create<LoaderStore>(set => ({
  key: 0,
  isOpen: false,
  show: () => set(prevState => ({...prevState, isOpen: true, key: prevState.key + 1})),
  hide: () => set(prevState => ({...prevState, isOpen: false})),
}));
