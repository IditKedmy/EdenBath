import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {useRouter} from 'expo-router';
import {useDirection} from '../../utils';
import {useLanguageStore} from '../../state';
import {colors, spacing} from 'theme';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import CountryFlag from 'react-native-country-flag';
import ELogo from 'assets/images/ELogo.png';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  isHome?: boolean;
  showFavorites?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  isHome = false,
  showFavorites = true,
}) => {
  const router = useRouter();
  const {isRTL, isMobile, flexDirection, textAlign} = useDirection();
  const {language, toggleLanguage} = useLanguageStore();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const handleFavorites = () => {
    router.push('/favorites');
  };

  const flagCode = language === 'he' ? 'US' : 'IL';

  if (isMobile) {
    // Mobile layout
    return (
      <View style={[styles.mobileHeader, {flexDirection}]}>
        {/* Hamburger menu */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            // Drawer would open here - for now just show menu
          }}
        >
          <MaterialCommunityIcons name="menu" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        {!isHome && (
          <Image
            source={ELogo}
            style={[styles.logo, {tintColor: colors.accent}]}
            resizeMode="contain"
          />
        )}

        <View style={styles.mobileTitleContainer}>
          <Text style={[styles.mobileTitle, {textAlign: isRTL ? 'right' : 'left'}]}>{title}</Text>
        </View>

        {showBack && (
          <TouchableOpacity style={styles.iconButton} onPress={handleBack}>
            <MaterialCommunityIcons
              name={isRTL ? 'arrow-right' : 'arrow-left'}
              size={24}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // Web layout
  return (
    <View style={[styles.webHeader, {flexDirection}]}>
      {/* Left zone (LTR) / Right zone (RTL) */}
      <View style={[styles.webLeftZone, {flexDirection}]}>
        <TouchableOpacity style={styles.flagButton} onPress={toggleLanguage}>
          <CountryFlag isoCode={flagCode} size={24} />
        </TouchableOpacity>

        {showFavorites && (
          <TouchableOpacity style={styles.iconButton} onPress={handleFavorites}>
            <MaterialCommunityIcons name="heart-outline" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        )}

        <Image
          source={ELogo}
          style={[styles.logo, {tintColor: colors.accent}]}
          resizeMode="contain"
        />
      </View>

      {/* Center */}
      <View style={styles.webCenter}>
        <Text style={[styles.webTitle, {textAlign}]}>{title}</Text>
      </View>

      {/* Right zone (LTR) / Left zone (RTL) */}
      {showBack && (
        <View style={styles.webRightZone}>
          <TouchableOpacity style={styles.iconButton} onPress={handleBack}>
            <MaterialCommunityIcons
              name={isRTL ? 'arrow-right' : 'arrow-left'}
              size={24}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    minHeight: 56,
  },
  webHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    minHeight: 64,
  },
  mobileTitleContainer: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  mobileTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  webTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  webLeftZone: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  webCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webRightZone: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagButton: {
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
  },
});
