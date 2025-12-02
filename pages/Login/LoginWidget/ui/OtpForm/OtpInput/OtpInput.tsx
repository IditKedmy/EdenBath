import {View, TextInput, StyleSheet, Keyboard} from 'react-native';
import {useEffect, useRef} from 'react';
import {colors} from 'theme/colors';

interface OtpInputProps {
  otp: string;
  handleChange: (value: string) => void;
  numInputs: number;
}

export function OtpInput({otp, handleChange, numInputs}: OtpInputProps) {
  const inputs = Array(numInputs).fill('');
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 300); // a short delay to allow layout to complete
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (text: string, index: number) => {
    if (!/^\d?$/.test(text)) return;

    const otpArray = otp.split('');
    otpArray[index] = text;

    if (text && index < numInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const newOtp = otpArray.join('');
    handleChange(newOtp);

    if (newOtp.length === numInputs && !newOtp.includes('')) {
      inputRefs.current[index]?.blur();
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && index > 0 && !otp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.otpContainer}>
      {inputs.map((_, index) => (
        <TextInput
          key={index}
          ref={ref => {
            inputRefs.current[index] = ref;
          }}
          value={otp[index] || ''}
          onChangeText={text => handleInputChange(text, index)}
          onKeyPress={({nativeEvent}) => handleKeyPress(nativeEvent.key, index)}
          keyboardType="number-pad"
          maxLength={1}
          style={styles.input}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpContainer: {
    direction: 'ltr',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 35,
    height: 45,
    fontSize: 17,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    marginHorizontal: 5,
    backgroundColor: colors.white,
  },
});
