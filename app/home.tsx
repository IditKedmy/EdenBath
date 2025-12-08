import React from 'react';
import {View, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'expo-router';
import {Header, Footer, WhatsAppButton} from 'shared/components/*';
import {useDirection} from 'shared/utils/useDirection';
import {colors, spacing, typography} from '../theme';

const categories = [
  {
    id: 'legs',
    name: 'categoryLegs',
    image: 'https://via.placeholder.com/300x200?text=Vanities+on+Legs',
  },
  {
    id: 'wall-mounted',
    name: 'categoryWallMounted',
    image: 'https://via.placeholder.com/300x200?text=Wall+Mounted',
  },
  {
    id: 'natural-wood',
    name: 'categoryNaturalWood',
    image: 'https://via.placeholder.com/300x200?text=Natural+Wood',
  },
  {
    id: 'sinks',
    name: 'categorySinks',
    image: 'https://via.placeholder.com/300x200?text=Sinks',
  },
];

export default function HomeScreen() {
  const {t} = useTranslation();
  const router = useRouter();
  const {isMobile, textAlign} = useDirection();

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/catalog?category=${categoryId}`);
  };

  return (
    <View style={styles.container}>
      <Header title={t('homeTitle')} isHome />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={[styles.heroTitle, {textAlign}]}>{t('heroTitle')}</Text>
            <Text style={[styles.heroSubtitle, {textAlign}]}>{t('heroSubtitle')}</Text>
          </View>
        </View>

        {/* Popular Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {textAlign}]}>{t('popularCategories')}</Text>
          <View style={[styles.categoriesGrid, isMobile ? styles.mobileGrid : styles.webGrid]}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, isMobile ? styles.mobileCard : styles.webCard]}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Image source={{uri: category.image}} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{t(category.name)}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  heroSection: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  heroContent: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  heroTitle: {
    ...typography.h1,
    color: colors.surface,
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    ...typography.body,
    color: colors.surface,
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  categoriesGrid: {
    gap: spacing.md,
  },
  mobileGrid: {
    flexDirection: 'column',
  },
  webGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  categoryCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mobileCard: {
    width: '100%',
  },
  webCard: {
    minWidth: 200,
    flex: 1,
    maxWidth: 300,
  },
  categoryImage: {
    width: '100%',
    aspectRatio: 3 / 2,
    resizeMode: 'cover',
  },
  categoryName: {
    ...typography.h3,
    color: colors.textPrimary,
    padding: spacing.md,
    textAlign: 'center',
  },
});
