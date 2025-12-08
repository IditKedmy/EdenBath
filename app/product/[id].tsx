import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Linking} from 'react-native';
import {Header, Button, Chip, Footer, WhatsAppButton} from 'shared/components/*';
import {useDirection} from 'shared/utils/*';
import {useProductsStore} from 'shared/state';
import {useFavoritesStore} from 'shared/state';
import {colors, spacing, typography} from '../../theme';

export default function ProductDetailsScreen() {
  const {t, i18n} = useTranslation();
  const {id} = useLocalSearchParams<{id: string}>();
  const router = useRouter();
  const {textAlign, language} = useDirection();
  const {getProductById} = useProductsStore();
  const {toggleFavorite} = useFavoritesStore();
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const product = getProductById(id || '');

  if (!product) {
    return (
      <View style={styles.container}>
        <Header title={t('catalog')} showBack />
        <View style={styles.errorContainer}>
          <Text>{t('productNotFound', 'Product not found')}</Text>
        </View>
      </View>
    );
  }

  const productName = language === 'he' ? product.name : product.nameEn;
  const productDescription = language === 'he' ? product.description : product.descriptionEn;
  const images = product.images || [product.image];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
      i18n.language === 'he'
        ? `שלום, אני מעוניין ב-${productName}`
        : `Hi, I'm interested in ${productName}`;
    const url = `whatsapp://send?phone=972502303303&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Linking.openURL(`https://wa.me/972502303303?text=${encodeURIComponent(message)}`);
    });
  };

  return (
    <View style={styles.container}>
      <Header title={productName} showBack />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Image Carousel */}
        <View style={styles.imageContainer}>
          <Image
            source={{uri: images[currentImageIndex]}}
            style={styles.mainImage}
            resizeMode="cover"
          />
          {images.length > 1 && (
            <View style={styles.dotsContainer}>
              {images.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.dot, currentImageIndex === index && styles.activeDot]}
                  onPress={() => setCurrentImageIndex(index)}
                />
              ))}
            </View>
          )}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={[styles.productName, {textAlign}]}>{productName}</Text>
          <Text style={[styles.price, {textAlign}]}>₪{product.price.toLocaleString()}</Text>
          <Text style={[styles.description, {textAlign}]}>{productDescription}</Text>
        </View>

        {/* Dimensions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {textAlign}]}>{t('dimensions')}</Text>
          <View style={styles.chipsContainer}>
            {product.dimensions.map(dim => (
              <Chip
                key={dim}
                label={dim}
                active={selectedDimension === dim}
                onPress={() => setSelectedDimension(selectedDimension === dim ? null : dim)}
              />
            ))}
          </View>
        </View>

        {/* Colors */}
        {product.colors.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, {textAlign}]}>{t('availableColors')}</Text>
            <View style={styles.chipsContainer}>
              {product.colors.map(color => (
                <Chip
                  key={color}
                  label={color}
                  active={selectedColor === color}
                  onPress={() => setSelectedColor(selectedColor === color ? null : color)}
                />
              ))}
            </View>
          </View>
        )}

        {/* Material */}
        {product.material && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, {textAlign}]}>{t('materialFinish')}</Text>
            <Text style={[styles.materialText, {textAlign}]}>
              {language === 'he' ? product.material : product.materialEn}
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Button title={t('requestQuote')} onPress={handleRequestQuote} variant="primary" />
          <Button
            title={t('saveToFavorites')}
            onPress={handleSaveToFavorites}
            variant="secondary"
          />
          <Button title={t('sendViaWhatsApp')} onPress={handleWhatsApp} variant="tertiary" />
        </View>

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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surface,
    opacity: 0.5,
  },
  activeDot: {
    backgroundColor: colors.accent,
    opacity: 1,
  },
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
  section: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  materialText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  actionsContainer: {
    padding: spacing.md,
    gap: spacing.md,
  },
});
