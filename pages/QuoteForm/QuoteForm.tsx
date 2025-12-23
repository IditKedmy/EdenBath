import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useLocalSearchParams} from 'expo-router';
import {Header, Footer, WhatsAppButton} from 'shared/components/*';
import {ProductSummary} from 'pages/QuoteForm/components/ProductSummary';
import {QuoteFormFields} from 'pages/QuoteForm/components/QuoteFormFields';
import {LocalProductParam} from 'pages/QuoteForm/models/localProductParam';
import {colors} from 'theme/colors';

export default function QuoteFormScreen() {
  const {t} = useTranslation();
  const params = useLocalSearchParams<LocalProductParam>();

  return (
    <View style={styles.container}>
      <Header title={t('quoteFormTitle')} showBack />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProductSummary
          productId={params.productId}
          dimension={params.dimension}
          color={params.color}
        />
        <QuoteFormFields
          productId={params.productId}
          dimension={params.dimension}
          color={params.color}
        />
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
});
