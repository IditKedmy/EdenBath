import {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';
import {OtpInput} from './OtpInput/OtpInput';
import {Text, Button} from 'react-native-paper';
import {colors} from 'theme/colors';
import {OtpCodeMessage} from './OtpCodeMessage';

interface OtpFormProps {
  onSubmit: (otp: string) => void;
  resendLogin: () => void;
  goBack: () => void;
}

export function OtpForm({onSubmit, resendLogin}: OtpFormProps) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [otp, setOtp] = useState('');
  const otpRef = useRef('');
  const numInputs = 6;

  const handleOtpChange = (value: string) => {
    setOtp(value);
    otpRef.current = value;

    if (value.length === numInputs) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  };

  const handleSubmit = () => {
    if (otp.length < numInputs) {
      Alert.alert('Error', `Please enter a valid ${numInputs}-digit OTP.`);
      return;
    }
    onSubmit(otp);
    setOtp('');
  };

  useEffect(() => {
    if (otp.length === numInputs) {
      Keyboard.dismiss();
      setTimeout(() => {
        onSubmit(otpRef.current);
        setIsSubmitDisabled(false);
        setOtp('');
      }, 250);
    }
  }, [otp, onSubmit]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.enterOtp}>
          <Text style={styles.enterOtpText}>Enter OTP Code</Text>
        </View>
        <OtpInput otp={otp} handleChange={handleOtpChange} numInputs={numInputs} />
        <View style={styles.buttonContainer}>
          <Button style={{width: '80%'}} disabled={isSubmitDisabled} onPress={handleSubmit}>
            Verification
          </Button>
          <OtpCodeMessage />
          <Button style={styles.resend} onPress={resendLogin}>
            <Text style={styles.resendText}>Click here to resend</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  loginLogo: {
    marginBottom: 10,
  },
  enterOtp: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterOtpText: {
    color: colors.border,
    opacity: 0.78,
  },
  resend: {
    marginBottom: 15,
  },
  resendText: {
    color: colors.primary,
    textDecorationColor: colors.primary,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});
