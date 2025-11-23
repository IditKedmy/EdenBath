import {Formik} from 'formik';
import {LoginSubmitRequest} from '../../viewModel/models';
import * as Yup from 'yup';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import {customYup} from 'shared/utils';
import {useRef} from 'react';
import {Button} from 'react-native-paper';

interface LoginFormProps {
  onSubmit: (value: LoginSubmitRequest) => void;
}

export function LoginForm({onSubmit}: LoginFormProps) {
  const nationalIdRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Formik
          initialValues={{
            nationalId: undefined,
            phone: undefined,
          }}
          validationSchema={Yup.object().shape({
            nationalId: Yup.string().max(9).min(9).required().matches(/^\d+$/),
            phone: customYup.string().phoneValidation().required(),
            // Todo: add email validation
          })}
          onSubmit={values => {
            onSubmit(values);
          }}
        >
          {({handleChange, handleBlur, handleSubmit, values, isValid, dirty}) => (
            <View>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={nationalIdRef}
                  style={styles.input}
                  value={values.nationalId}
                  placeholder="ID"
                  onChangeText={text => {
                    // Allow only numeric input
                    const numericText = text.replace(/[^0-9]/g, '');
                    handleChange('nationalId')(numericText);
                  }}
                  onBlur={handleBlur('nationalId')}
                  returnKeyType={Platform.OS === 'android' ? 'next' : undefined}
                  onSubmitEditing={() => phoneRef.current?.focus()}
                  maxLength={9}
                  keyboardType="numeric"
                  textAlign="center"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={phoneRef}
                  style={styles.input}
                  value={values.phone}
                  placeholder="Phone"
                  onChangeText={text => {
                    // Allow only numeric input and '+' as the first character
                    const phoneText = text.replace(/(?!^)[^0-9]/g, '');
                    handleChange('phone')(phoneText);
                  }}
                  onBlur={handleBlur('phone')}
                  returnKeyType={Platform.OS === 'android' ? 'done' : undefined}
                  onSubmitEditing={() => handleSubmit()}
                  maxLength={13}
                  keyboardType="numeric"
                  textAlign="center"
                />
              </View>
              <Button
                onPress={() => handleSubmit()}
                style={styles.button}
                disabled={!dirty || !isValid}
              >
                Continue
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '80%',
    marginVertical: 5,
    fontSize: 18,
  },
  button: {
    width: '50%',
    borderRadius: 50,
    alignSelf: 'center',
  },
  buttonWithMarginTop: {
    marginTop: 20,
  },
});
