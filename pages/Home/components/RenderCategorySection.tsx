import {ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {Category} from '../models/category';
import {Router} from 'expo-router';
import {TFunction} from 'i18next';
import {colors} from 'theme/colors';
import {spacing} from 'theme/spacing';

type Props = {
  category: Category;
  router: Router;
  isMobile: boolean;
  t: TFunction<'translation', undefined>;
};

export function RenderCategorySection({category, router, isMobile, t}: Props) {
  const handleCategoryPress = (categoryId: string) => {
    router.push(`/catalog?category=${categoryId}`);
  };

  return (
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
  );
}

const styles = StyleSheet.create({
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
