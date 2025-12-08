import React from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Header, Button, Input, Footer, WhatsAppButton} from 'shared/components/*';
import {useDirection} from 'shared/utils/*';
import {useProductsStore} from 'shared/state';
import {colors, spacing, typography} from '../theme';
import {openSnackbar} from 'shared/modals/*';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('required'),
  phoneNumber: Yup.string().required('required'),
  city: Yup.string(),
  notes: Yup.string(),
});

export default function QuoteFormScreen() {
  const {t} = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{
    productId?: string;
    dimension?: string;
    color?: string;
  }>();
  const {textAlign, language} = useDirection();
  const {getProductById} = useProductsStore();

  const product = params.productId ? getProductById(params.productId) : null;
  const productName = product ? (language === 'he' ? product.name : product.nameEn) : '';

  interface QuoteFormValues {
    fullName: string;
    phoneNumber: string;
    city: string;
    notes: string;
  }

  const handleSubmit = async (values: QuoteFormValues) => {
    try {
      // In a real app, this would send to a backend
      console.log('Quote request:', {
        ...values,
        productId: params.productId,
        dimension: params.dimension,
        color: params.color,
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
    <View style={styles.container}>
      <Header title={t('quoteFormTitle')} showBack />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Product Summary */}
        {product && (
          <View style={styles.summaryCard}>
            <Image source={{uri: product.image}} style={styles.summaryImage} />
            <View style={styles.summaryContent}>
              <Text style={[styles.summaryName, {textAlign}]}>{productName}</Text>
              {params.dimension && (
                <Text style={[styles.summaryDetail, {textAlign}]}>
                  {t('dimensions')}: {params.dimension}
                </Text>
              )}
              {params.color && (
                <Text style={[styles.summaryDetail, {textAlign}]}>
                  {t('availableColors')}: {params.color}
                </Text>
              )}
              <Text style={[styles.summaryPrice, {textAlign}]}>{t('priceOnQuote')}</Text>
            </View>
          </View>
        )}

        {/* Form */}
        <Formik
          initialValues={{
            fullName: '',
            phoneNumber: '',
            city: '',
            notes: '',
          }}
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

        <Footer />
      </ScrollView>
      <WhatsAppButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: spacing.md,
    margin: spacing.md,
    borderRadius: 16,
    gap: spacing.md,
  },
  summaryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  summaryContent: {
    flex: 1,
  },
  summaryName: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  summaryDetail: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  summaryPrice: {
    ...typography.body,
    color: colors.accent,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
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
