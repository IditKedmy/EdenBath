import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button, Input} from 'shared/components/*';
import {customYup, useDirection} from 'shared/utils/*';
import {colors, spacing, typography} from 'theme/index';
import {openSnackbar} from 'shared/modals/*';
import {useRouter} from 'expo-router';
import {LocalProductParam} from 'pages/QuoteForm/models/localProductParam';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('required'),
  phoneNumber: customYup.string().phoneValidation().required('required'),
  city: Yup.string(),
  notes: Yup.string(),
});

interface QuoteFormValues {
  fullName: string;
  phoneNumber: string;
  city: string;
  notes: string;
}

export function QuoteFormFields({productId, dimension, color}: LocalProductParam) {
  const {t} = useTranslation();
  const {textAlign} = useDirection();
  const router = useRouter();

  const handleSubmit = async (values: QuoteFormValues) => {
    try {
      // In a real app, this would send to a backend
      console.log('Quote request:', {
        ...values,
        productId: productId,
        dimension: dimension,
        color: color,
      });

      openSnackbar(t('weWillContactYou'), 'success');

      // Navigate back after a delay
      setTimeout(() => {
        router.back();
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      openSnackbar('Error submitting form', 'error');
    }
  };

  return (
    <Formik
      initialValues={
        {
          fullName: '',
          phoneNumber: '',
          city: '',
          notes: '',
        } as QuoteFormValues
      }
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({handleChange, handleBlur, handleSubmit: submitForm, values, errors, touched}) => (
        <View style={styles.formContainer}>
          <Input
            label={t('fullName')}
            value={values.fullName}
            onChangeText={handleChange('fullName')}
            onBlur={handleBlur('fullName')}
            error={touched.fullName && errors.fullName ? t('required') : undefined}
            required
          />

          <Input
            label={t('phoneNumber')}
            value={values.phoneNumber}
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            keyboardType="phone-pad"
            error={touched.phoneNumber && errors.phoneNumber ? t('required') : undefined}
            required
          />

          <Input
            label={t('city')}
            value={values.city}
            onChangeText={handleChange('city')}
            onBlur={handleBlur('city')}
          />

          <Input
            label={t('notes')}
            value={values.notes}
            onChangeText={handleChange('notes')}
            onBlur={handleBlur('notes')}
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />

          <Button title={t('send')} onPress={submitForm} variant="primary" />

          <Text style={[styles.caption, {textAlign}]}>{t('weWillContactYou')}</Text>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: spacing.md,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  caption: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});
