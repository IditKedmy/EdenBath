import {StyleSheet, View} from 'react-native';
import {Dialog, Portal, IconButton, Text} from 'react-native-paper';
import {create} from 'zustand';
import {ReactNode} from 'react';

type PopupStore = {
  icon: string | null;
  iconColor: string | undefined;
  title: ReactNode | null;
  content: ReactNode | null;
  scrollArea: ReactNode | null;
  actions: ReactNode | null;
  isOpen: boolean;
  key: number;
  isCloseIcon: boolean;
  isClosable: boolean;
  open: (
    content?: ReactNode,
    scrollArea?: ReactNode,
    actions?: ReactNode,
    title?: ReactNode,
    icon?: string,
    iconColor?: string,
    hasCloseButton?: boolean,
    isClosable?: boolean,
  ) => void;
  close: () => void;
};

// Define Zustand store
const usePopupStore = create<PopupStore>(set => ({
  icon: null,
  iconColor: undefined,
  title: null,
  content: null,
  scrollArea: null,
  actions: null,
  isOpen: false,
  key: 0,
  isCloseIcon: false,
  isClosable: true,
  open: (
    content?: ReactNode,
    scrollArea?: ReactNode,
    actions?: ReactNode,
    title?: ReactNode,
    icon?: string,
    iconColor?: string,
    isCloseIcon?: boolean,
    isClosable = true,
  ) =>
    set(state => ({
      ...state,
      icon,
      iconColor,
      title,
      content,
      scrollArea,
      actions: actions,
      isOpen: true,
      isCloseIcon,
      isClosable,
      key: state.key + 1,
    })),
  close: () => set(state => ({...state, isOpen: false, content: null})),
}));

type OpenPopupProps = {
  isCloseIcon?: boolean;
  icon?: string;
  iconColor?: string;
  title?: ReactNode;
  content?: ReactNode;
  scrollArea?: ReactNode;
  actions?: ReactNode;
  isClosable?: boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
export const openPopup = (props: OpenPopupProps) => {
  const {content, scrollArea, actions, title, icon, iconColor, isCloseIcon, isClosable} = props;
  usePopupStore
    .getState()
    .open(content, scrollArea, actions, title, icon, iconColor, isCloseIcon, isClosable);
};

// eslint-disable-next-line react-refresh/only-export-components
export const closePopup = () => {
  usePopupStore.getState().close();
};

export const Popup = () => {
  const {
    title,
    icon,
    iconColor,
    content,
    scrollArea,
    actions,
    isOpen,
    close,
    isCloseIcon,
    isClosable,
    key,
  } = usePopupStore();

  return (
    <Portal>
      <Dialog
        key={key}
        visible={isOpen}
        onDismiss={isClosable ? close : undefined}
        style={{maxHeight: '100%'}}
      >
        <View style={styles.header}>
          {icon && (
            <>
              <View style={{margin: 20}} />
              <Dialog.Icon icon={icon} color={iconColor} size={30} />
            </>
          )}
          {isCloseIcon && <IconButton style={!icon && styles.close} onPress={close} icon="close" />}
        </View>
        {title && <Dialog.Title>{title}</Dialog.Title>}
        {content && (
          <Dialog.Content>
            {typeof content === 'string' ? <Text>{content}</Text> : content}
          </Dialog.Content>
        )}
        {scrollArea && <Dialog.ScrollArea>{scrollArea}</Dialog.ScrollArea>}
        {actions && <Dialog.Actions>{actions}</Dialog.Actions>}
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  close: {
    width: '90%',
    alignItems: 'flex-end',
  },
});
