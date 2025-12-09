import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, ImageBackground} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'expo-router';
import {Header, Footer, WhatsAppButton} from 'shared/components/*';
import {useDirection} from 'shared/utils/useDirection';
import {colors, spacing, typography} from '../theme';

// Hero background image from Figma
const heroBackgroundImage =
  'https://www.figma.com/api/mcp/asset/81e5a4e6-6138-40c9-b103-b6643f165ab9';

// Category images from Figma
const categoryImages = {
  legs: 'https://www.figma.com/api/mcp/asset/821cca83-c0cb-491a-b70e-842e203b6d62',
  'wall-mounted': 'https://www.figma.com/api/mcp/asset/3513b422-1179-43bd-9aae-a52aa7503288',
  'natural-wood': 'https://www.figma.com/api/mcp/asset/ba3342dc-1ca5-465c-bba8-10a3b03ed461',
  sinks: 'https://www.figma.com/api/mcp/asset/9a62d088-74b5-42a4-99d7-845bd5b07f95',
};

const categories = [
  {
    id: 'legs',
    name: 'categoryLegs',
    image: categoryImages.legs,
  },
  {
    id: 'wall-mounted',
    name: 'categoryWallMounted',
    image: categoryImages['wall-mounted'],
  },
  {
    id: 'natural-wood',
    name: 'categoryNaturalWood',
    image: categoryImages['natural-wood'],
  },
  {
    id: 'sinks',
    name: 'categorySinks',
    image: categoryImages.sinks,
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
        <ImageBackground
          source={{uri: heroBackgroundImage}}
          style={styles.heroSection}
          imageStyle={styles.heroBackgroundImage}
        >
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={[styles.heroTitle, {textAlign}]}>{t('heroTitle')}</Text>
            <Text style={[styles.heroSubtitle, {textAlign}]}>{t('heroSubtitle')}</Text>
          </View>
        </ImageBackground>

        {/* Popular Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {textAlign}]}>{t('popularCategories')}</Text>
          <View style={[styles.categoriesGrid, isMobile ? styles.mobileGrid : styles.webGrid]}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, isMobile ? styles.mobileCard : styles.webCard]}
                onPress={() => handleCategoryPress(category.id)}
                activeOpacity={0.9}
              >
                <ImageBackground
                  source={{uri: category.image}}
                  style={styles.categoryImage}
                  imageStyle={styles.categoryImageStyle}
                >
                  <View style={styles.categoryGradientOverlay}>
                    <View style={styles.categoryGradientLayer} />
                    <View style={styles.categoryTextContainer}>
                      <Text style={styles.categoryName}>{t(category.name)}</Text>
                    </View>
                  </View>
                </ImageBackground>
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
    minHeight: 400,
    paddingVertical: spacing.xl * 2,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  heroBackgroundImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(43, 52, 64, 0.5)', // colors.primary with 50% opacity
  },
  heroContent: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
    zIndex: 1,
    paddingHorizontal: spacing.md,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 60,
    color: colors.surface,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 36,
    color: colors.surface,
    opacity: 0.9,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h2,
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 36,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  categoriesGrid: {
    gap: spacing.lg,
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
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  mobileCard: {
    width: '100%',
    height: 256,
  },
  webCard: {
    minWidth: 200,
    flex: 1,
    maxWidth: 300,
    height: 256,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  categoryImageStyle: {
    resizeMode: 'cover',
  },
  categoryGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  categoryGradientLayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  categoryTextContainer: {
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
    zIndex: 1,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 30,
    color: colors.surface,
    textAlign: 'center',
    // Add text shadow for better readability
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
  },
});
