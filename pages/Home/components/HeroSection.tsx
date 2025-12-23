import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useDirection} from 'shared/utils/*';
import {colors, spacing} from 'theme/index';

const heroBackgroundImage =
  'https://www.figma.com/api/mcp/asset/81e5a4e6-6138-40c9-b103-b6643f165ab9';

export function HeroSection() {
  const {t} = useTranslation();
  const {textAlign} = useDirection();

  return (
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
  );
}

const styles = StyleSheet.create({
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
});
