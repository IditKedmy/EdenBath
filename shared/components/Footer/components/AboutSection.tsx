import React from 'react';
import {View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {colors} from 'theme/index';
import EdenBathLogo from 'assets/images/EdenBathLogo.png';
import {footerStyles} from '../styles';
import {useTranslation} from 'react-i18next';
import {useDirection} from 'shared/utils/*';

export function AboutSection() {
  const {t} = useTranslation();
  const {textAlign, direction} = useDirection();

  return (
    <View>
      <Image
        source={EdenBathLogo}
        style={[footerStyles.footerLogo, {tintColor: colors.accent}]}
        resizeMode="contain"
      />
      <Text style={[footerStyles.brandText, {textAlign, direction}]}>{t('brandDescription')}</Text>
    </View>
  );
}
