import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useLocalSearchParams} from 'expo-router';
import {Header, Footer, WhatsAppButton} from 'shared/components/*';
import {useDirection} from 'shared/utils/*';
import {useProductsStore} from 'shared/state';
import {ImageCarousel} from './components/ImageCarousel';
import {ProductInfo} from './components/ProductInfo';
import {SelectOptionSection} from './components/SelectOptionSection';
import {ActionButtons} from './components/ActionButtons';
import {spacing} from 'theme/spacing';
import {colors} from 'theme/colors';

export default function ProductDetailsScreen() {
  const {t, i18n} = useTranslation();
  const {id} = useLocalSearchParams<{id: string}>();
  const {language} = useDirection();
  const {getProductById} = useProductsStore();
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const product = getProductById(id || '');
  const productName = language === 'he' ? product?.name : product?.nameEn;
  const productDescription = language === 'he' ? product?.description : product?.descriptionEn;

  return (
    <View style={styles.container}>
      <Header title={productName || t('productNotFound')} showBack />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {!product ? (
          <View style={styles.errorContainer}>
            <Text>{t('productNotFound', 'Product not found')}</Text>
          </View>
        ) : (
          <>
            <ImageCarousel product={product} />
            <ProductInfo
              name={productName || ''}
              price={product.price}
              description={productDescription || ''}
            />
            <SelectOptionSection
              title={t('dimensions')}
              options={product.dimensions}
              selectedOption={selectedDimension}
              setSelected={setSelectedDimension}
            />
            {product.colors.length > 0 && (
              <SelectOptionSection
                title={t('availableColors')}
                options={product.colors}
                selectedOption={selectedColor}
                setSelected={setSelectedColor}
              />
            )}
            <ActionButtons
              product={product}
              language={i18n.language}
              productName={productName || ''}
              selectedDimension={selectedDimension || ''}
              selectedColor={selectedColor || ''}
            />
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
});
