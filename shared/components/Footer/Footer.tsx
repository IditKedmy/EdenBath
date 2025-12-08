import React from 'react';
import {View, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'expo-router';
import {useDirection} from '../../utils';
import {colors, spacing, typography} from 'theme';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Image} from 'react-native';
import EdenBathLogo from 'assets/images/EdenBathLogo.png';

export const Footer: React.FC = () => {
  const {t} = useTranslation();
  const router = useRouter();
  const {isMobile, flexDirection, textAlign} = useDirection();

  const handlePhone = () => {
    Linking.openURL('tel:+972502303303');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:edenbath1@gmail.com');
  };

  const handleFacebook = () => {
    Linking.openURL('https://www.facebook.com/people/Eden-ארונות-אמבטיה-מעוצבים/100070888553965/');
  };

  return (
    <View style={[styles.footer, {flexDirection: isMobile ? 'column' : flexDirection}]}>
      {/* Brand / About Section */}
      <View style={[styles.section, isMobile && styles.mobileSection]}>
        <Image
          source={EdenBathLogo}
          style={[styles.footerLogo, {tintColor: colors.accent}]}
          resizeMode="contain"
        />
        <Text style={[styles.brandText, {textAlign}]}>{t('brandDescription')}</Text>
      </View>

      {/* Quick Navigation */}
      <View style={[styles.section, isMobile && styles.mobileSection]}>
        <Text style={[styles.sectionTitle, {textAlign, color: colors.accent}]}>
          {t('quickLinks')}
        </Text>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Text style={[styles.link, {textAlign}]}>{t('home')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/catalog')}>
          <Text style={[styles.link, {textAlign}]}>{t('catalog')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/favorites')}>
          <Text style={[styles.link, {textAlign}]}>{t('favorites')}</Text>
        </TouchableOpacity>
      </View>

      {/* Contact */}
      <View style={[styles.section, isMobile && styles.mobileSection]}>
        <Text style={[styles.sectionTitle, {textAlign, color: colors.accent}]}>
          {t('contactUs')}
        </Text>
        <TouchableOpacity style={[styles.contactRow, {flexDirection}]} onPress={handlePhone}>
          <MaterialCommunityIcons name="phone" size={20} color={colors.surface} />
          <Text style={[styles.contactText, {textAlign}]}>050-230-3303</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.contactRow, {flexDirection}]} onPress={handleEmail}>
          <MaterialCommunityIcons name="email" size={20} color={colors.surface} />
          <Text style={[styles.contactText, {textAlign}]}>edenbath1@gmail.com</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.contactRow, {flexDirection}]} onPress={handleFacebook}>
          <MaterialCommunityIcons name="facebook" size={20} color={colors.surface} />
          <Text style={[styles.contactText, {textAlign}]}>Facebook</Text>
        </TouchableOpacity>
      </View>

      {/* Copyright */}
      <View style={styles.copyrightContainer}>
        <View style={styles.separator} />
        <Text style={[styles.copyright, {textAlign}]}>{t('allRightsReserved')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  section: {
    flex: 1,
    marginBottom: spacing.md,
  },
  mobileSection: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  footerLogo: {
    width: 40,
    height: 40,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  brandText: {
    ...typography.bodySmall,
    color: colors.surface,
    lineHeight: 20,
  },
  link: {
    ...typography.bodySmall,
    color: colors.surface,
    marginBottom: spacing.sm,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  contactText: {
    ...typography.bodySmall,
    color: colors.surface,
  },
  copyrightContainer: {
    width: '100%',
    marginTop: spacing.md,
    paddingTop: spacing.md,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.sm,
  },
  copyright: {
    ...typography.caption,
    color: colors.surface,
  },
});
