import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {useSnackbarMessage} from 'shared/modals';
import {useEffect, useState} from 'react';
import {colors} from 'theme/colors';

export function OtpCodeMessage() {
  const snackbarMessage = useSnackbarMessage();
  const [message, setMessage] = useState<string | undefined>();

  useEffect(() => {
    if (!!snackbarMessage && snackbarMessage === 'Auth.InvalidOtp') {
      setMessage('Please note, invalid code.');
    }
  }, [snackbarMessage]);

  if (!message) {
    return (
      <View style={styles.container}>
        <Text>Didn’t receive a code?</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textField}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    color: colors.error,
    width: '80%',
    alignItems: 'center',
  },
});
