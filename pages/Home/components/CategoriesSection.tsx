import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'expo-router';
import {useDirection} from 'shared/utils/*';
import {colors, spacing, typography} from 'theme/index';
import {RenderCategorySection} from 'pages/Home/components/RenderCategorySection';
import {Category} from '../models/category';

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
] as Category[];

interface CategoriesSectionProps {
  isMobile: boolean;
}

export function CategoriesSection({isMobile}: CategoriesSectionProps) {
  const {t} = useTranslation();
  const router = useRouter();
  const {textAlign} = useDirection();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, {textAlign}]}>{t('popularCategories')}</Text>
      <View style={[styles.categoriesGrid, isMobile ? styles.mobileGrid : styles.webGrid]}>
        {categories.map(category => (
          <RenderCategorySection
            key={category.id}
            category={category}
            router={router}
            isMobile={isMobile}
            t={t}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
