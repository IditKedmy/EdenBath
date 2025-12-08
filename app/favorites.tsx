import React from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Header, ProductCard, Footer, WhatsAppButton, Button} from 'shared/components/*';
import {useDirection} from 'shared/utils/*';
import {useFavoritesStore, FavoriteProduct} from 'shared/state';
import {useProductsStore, Product} from 'shared/state';
import {colors, spacing, typography} from '../theme';

export default function FavoritesScreen() {
  const {t} = useTranslation();
  const {isMobile, textAlign} = useDirection();
  const {favorites} = useFavoritesStore();
  const {getProductById} = useProductsStore();

  const favoriteProducts = favorites
    .map((fav: FavoriteProduct) => getProductById(fav.id))
    .filter((product: Product | undefined): product is Product => product !== undefined);

  const numColumns = isMobile ? 1 : 3;

  return (
    <View style={styles.container}>
      <Header title={t('favoritesTitle')} showBack />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {favoriteProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, {textAlign}]}>{t('noFavorites')}</Text>
          </View>
        ) : (
          <>
            <View style={styles.productsContainer}>
              <FlatList
                data={favoriteProducts}
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
            {favoriteProducts.length > 1 && (
              <View style={styles.requestAllContainer}>
                <Button
                  title={t('requestQuoteForAll')}
                  onPress={() => {
                    // Navigate to quote form with all favorites
                  }}
                  variant="primary"
                />
              </View>
            )}
          </>
        )}

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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    minHeight: 400,
  },
  emptyText: {
    ...typography.h3,
    color: colors.textSecondary,
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
  requestAllContainer: {
    padding: spacing.md,
  },
});
