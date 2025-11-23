import {LoginForm} from './ui/LoginForm/LoginForm';
import {OtpForm} from './ui/OtpForm/OtpForm';
import {useLoginWidgetViewModel} from './useLoginWidgetViewModel';
import {View, StyleSheet} from 'react-native';

export function LoginWidget() {
  const {isStartFromScratch, handleLoginSubmit, handleOtpSubmit, handleResendLogin, handleGoBack} =
    useLoginWidgetViewModel();

  return (
    <View style={styles.container}>
      {isStartFromScratch ? (
        <View style={{width: '100%'}}>
          <LoginForm onSubmit={handleLoginSubmit} />
        </View>
      ) : (
        <View>
          <OtpForm
            onSubmit={handleOtpSubmit}
            goBack={handleGoBack}
            resendLogin={handleResendLogin}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});
