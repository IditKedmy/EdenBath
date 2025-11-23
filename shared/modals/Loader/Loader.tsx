import {View, StyleSheet, Modal} from 'react-native';
import {loaderStore} from './loaderStore';
import {ActivityIndicator} from 'react-native-paper';

export function Loader() {
  const isOpen = loaderStore(state => state.isOpen);

  return (
    <Modal transparent={true} visible={isOpen} animationType="fade">
      <View style={styles.backdrop}>
        <ActivityIndicator animating={isOpen} size="large" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});
