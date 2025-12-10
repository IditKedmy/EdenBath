import React from 'react';
import {View, Linking} from 'react-native';
import {Text} from 'react-native-paper';
import {colors} from 'theme/index';
import {ContactMethod} from './ContactMethod';
import {footerStyles} from '../styles';
import {useTranslation} from 'react-i18next';
import {useDirection} from 'shared/utils/*';

export function ContactSection() {
  const {t} = useTranslation();
  const {textAlign} = useDirection();

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
    <View>
      <Text style={[footerStyles.sectionTitle, {textAlign, color: colors.accent}]}>
        {t('contactUs')}
      </Text>
      <ContactMethod iconName="phone" label="050-230-3303" onPress={handlePhone} />
      <ContactMethod iconName="email" label="edenbath1@gmail.com" onPress={handleEmail} />
      <ContactMethod iconName="facebook" label="Facebook" onPress={handleFacebook} />
    </View>
  );
}
