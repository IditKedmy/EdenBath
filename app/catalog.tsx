import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useLocalSearchParams} from 'expo-router';
import {Header, Chip, ProductCard, Footer, WhatsAppButton} from 'shared/components/*';
import {useDirection} from 'shared/utils/*';
import {Product, useProductsStore} from 'shared/state';
import {colors, spacing} from '../theme';

export default function CatalogScreen() {
  const {t} = useTranslation();
  const params = useLocalSearchParams();
  const {isMobile} = useDirection();
  const {products} = useProductsStore();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filters = [
    {id: 'size', label: t('filterSize')},
    {id: 'color', label: t('filterColor')},
    {id: 'style', label: t('filterStyle')},
    {id: 'price', label: t('filterPrice')},
  ];

  const category = params.category as string;
  const {language} = useDirection();

  // Map category IDs to actual category names
  const categoryMap: Record<string, string> = {
    legs: language === 'he' ? 'ארונות על רגליים' : 'Vanities on Legs',
    'wall-mounted': language === 'he' ? 'ארונות תלויים' : 'Wall-Mounted Vanities',
    'natural-wood': language === 'he' ? 'עץ טבעי' : 'Natural Wood',
    sinks: language === 'he' ? 'כיורים' : 'Sinks',
  };

  const categoryName = category ? categoryMap[category] : null;
  const filteredProducts = categoryName
    ? products.filter((p: Product) => p.category === categoryName || p.categoryEn === categoryName)
    : products;

  const numColumns = isMobile ? 1 : 3;

  return (
    <View style={styles.container}>
      <Header title={categoryName || t('catalog')} showBack />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Filter Bar */}
        <View style={styles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContent}
          >
            {filters.map(filter => (
              <Chip
                key={filter.id}
                label={filter.label}
                active={selectedFilter === filter.id}
                onPress={() => setSelectedFilter(selectedFilter === filter.id ? null : filter.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Product Grid */}
        <View style={styles.productsContainer}>
          <FlatList
            data={filteredProducts}
            renderItem={({item}) => (
              <View style={isMobile ? styles.mobileItem : styles.webItem}>
                <ProductCard product={item} />
              </View>
            )}
            keyExtractor={item => item.id}
            numColumns={numColumns}
            scrollEnabled={false}
            contentContainerStyle={styles.productsList}
            columnWrapperStyle={!isMobile ? styles.row : undefined}
          />
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
  filterContainer: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  productsContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  productsList: {
    paddingBottom: spacing.xl,
  },
  mobileItem: {
    width: '100%',
  },
  webItem: {
    flex: 1,
    margin: spacing.sm,
    maxWidth: '33.33%',
  },
  row: {
    justifyContent: 'flex-start',
  },
});
