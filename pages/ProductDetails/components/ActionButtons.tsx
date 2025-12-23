import React from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Button} from 'shared/components/*';
import {spacing} from 'theme/index';
import {useRouter} from 'expo-router';
import {Product, useFavoritesStore} from 'shared/state';

interface ActionButtonsProps {
  product: Product;
  language: string;
  productName: string;
  selectedDimension: string;
  selectedColor: string;
}

export function ActionButtons({
  product,
  language,
  productName,
  selectedDimension,
  selectedColor,
}: ActionButtonsProps) {
  const {t} = useTranslation();
  const router = useRouter();
  const {toggleFavorite} = useFavoritesStore();

  const handleRequestQuote = () => {
    router.push({
      pathname: '/quote-form',
      params: {
        productId: product.id,
        dimension: selectedDimension || '',
        color: selectedColor || '',
      },
    });
  };

  const handleSaveToFavorites = () => {
    toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  const handleWhatsApp = () => {
    const message =
      language === 'he'
        ? `שלום, אני מעוניין ב-${productName}`
        : `Hi, I'm interested in ${productName}`;
    const url = `whatsapp://send?phone=972502303303&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Linking.openURL(`https://wa.me/972502303303?text=${encodeURIComponent(message)}`);
    });
  };

  return (
    <View style={styles.actionsContainer}>
      <Button title={t('requestQuote')} onPress={handleRequestQuote} variant="primary" />
      <Button title={t('saveToFavorites')} onPress={handleSaveToFavorites} variant="secondary" />
      <Button title={t('sendViaWhatsApp')} onPress={handleWhatsApp} variant="tertiary" />
    </View>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    padding: spacing.md,
    gap: spacing.md,
  },
});
