import React, {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from 'theme/colors';
import {spacing} from 'theme/spacing';
import {Product} from 'shared/state';

interface ImageCarouselProps {
  product: Product;
}

export function ImageCarousel({product}: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images || [product.image];

  return (
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
  );
}

const styles = StyleSheet.create({
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
});
