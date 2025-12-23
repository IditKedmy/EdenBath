import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useDirection} from 'shared/utils/*';
import {useProductsStore} from 'shared/state/productsStore';
import {colors, spacing, typography} from 'theme/index';
import {LocalProductParam} from 'pages/QuoteForm/models/localProductParam';

export function ProductSummary({productId, dimension, color}: LocalProductParam) {
  const {t} = useTranslation();
  const {textAlign, language} = useDirection();
  const {getProductById} = useProductsStore();

  const product = productId ? getProductById(productId) : null;

  if (!product) {
    return null;
  }

  const productName = language === 'he' ? product.name : product.nameEn;

  return (
    <View style={styles.summaryCard}>
      <Image source={{uri: product.image}} style={styles.summaryImage} />
      <View style={styles.summaryContent}>
        <Text style={[styles.summaryName, {textAlign}]}>{productName}</Text>
        {dimension && (
          <Text style={[styles.summaryDetail, {textAlign}]}>
            {t('dimensions')}: {dimension}
          </Text>
        )}
        {color && (
          <Text style={[styles.summaryDetail, {textAlign}]}>
            {t('availableColors')}: {color}
          </Text>
        )}
        <Text style={[styles.summaryPrice, {textAlign}]}>{t('priceOnQuote')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
