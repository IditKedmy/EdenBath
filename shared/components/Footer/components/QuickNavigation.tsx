import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {colors} from 'theme/index';
import {footerStyles} from '../styles';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'expo-router';
import {useDirection} from 'shared/utils/*';

export function QuickNavigation() {
  const {t} = useTranslation();
  const router = useRouter();
  const {textAlign} = useDirection();
  return (
    <View>
      <Text style={[footerStyles.sectionTitle, {textAlign, color: colors.accent}]}>
        {t('quickLinks')}
      </Text>
      <TouchableOpacity onPress={() => router.push('/home')}>
        <Text style={[footerStyles.link, {textAlign}]}>{t('home')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/catalog')}>
        <Text style={[footerStyles.link, {textAlign}]}>{t('catalog')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/favorites')}>
        <Text style={[footerStyles.link, {textAlign}]}>{t('favorites')}</Text>
      </TouchableOpacity>
    </View>
  );
}
