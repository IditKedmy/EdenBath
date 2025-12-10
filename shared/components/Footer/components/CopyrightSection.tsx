import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {footerStyles} from '../styles';
import {useTranslation} from 'react-i18next';
import {useDirection} from 'shared/utils/*';

export function CopyrightSection() {
  const {t} = useTranslation();
  const {textAlign} = useDirection();
  return (
    <View style={footerStyles.copyrightContainer}>
      <View style={footerStyles.separator} />
      <Text style={[footerStyles.copyright, {textAlign}]}>{t('allRightsReserved')}</Text>
    </View>
  );
}
