import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {useDirection} from 'shared/utils/*';
import {colors, spacing, typography} from 'theme/index';

interface ProductInfoProps {
  name: string;
  price: number;
  description: string;
}

export function ProductInfo({name, price, description}: ProductInfoProps) {
  const {textAlign} = useDirection();

  return (
    <View style={styles.infoSection}>
      <Text style={[styles.productName, {textAlign}]}>{name}</Text>
      <Text style={[styles.price, {textAlign}]}>₪{Math.round(price).toLocaleString()}</Text>
      <Text style={[styles.description, {textAlign}]}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoSection: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
  },
  productName: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  price: {
    ...typography.h2,
    color: colors.accent,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
