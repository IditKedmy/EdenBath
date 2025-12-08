import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Linking} from 'react-native';
import {colors} from 'theme/colors';
import {useDirection} from '../../utils';
import {useTranslation} from 'react-i18next';

export const WhatsAppButton: React.FC = () => {
  const {isRTL} = useDirection();
  const {i18n} = useTranslation();

  const handlePress = () => {
    const message =
      i18n.language === 'he'
        ? 'שלום, אני מעוניין בארונות אמבטיה'
        : "Hi, I'm interested in bathroom vanities";
    const url = `whatsapp://send?phone=972502303303&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      // Fallback to web WhatsApp
      Linking.openURL(`https://wa.me/972502303303?text=${encodeURIComponent(message)}`);
    });
  };

  return (
    <TouchableOpacity
      style={[styles.button, isRTL ? styles.leftPosition : styles.rightPosition]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <MaterialCommunityIcons name="whatsapp" size={28} color={colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  leftPosition: {
    left: 24,
  },
  rightPosition: {
    right: 24,
  },
});
