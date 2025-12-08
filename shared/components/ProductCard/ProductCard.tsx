import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, GestureResponderEvent} from 'react-native';
import {Text} from 'react-native-paper';
import {colors, spacing, typography} from '../../../theme';
import {useFavoritesStore} from '../../state';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import {Product} from '../../state';
import {useDirection} from '../../utils';

interface ProductCardProps {
  product: Product;
  showFavorite?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({product, showFavorite = true}) => {
  const router = useRouter();
  const {isFavorite, toggleFavorite} = useFavoritesStore();
  const {language} = useDirection();
  const favorite = isFavorite(product.id);
  const productName = language === 'he' ? product.name : product.nameEn;

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  const handleFavoritePress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{uri: product.image}} style={styles.image} />
        {showFavorite && (
          <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
            <MaterialCommunityIcons
              name={favorite ? 'heart' : 'heart-outline'}
              size={24}
              color={favorite ? colors.error : colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {productName}
        </Text>
        <Text style={styles.price}>₪{product.price.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 4 / 3,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    padding: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: 20,
  },
  content: {
    padding: spacing.md,
  },
  name: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  price: {
    ...typography.body,
    color: colors.accent,
    fontWeight: '600',
  },
});
