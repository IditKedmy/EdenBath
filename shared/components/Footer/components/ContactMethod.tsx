import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {colors} from 'theme/index';
import {footerStyles} from '../styles';
import {useDirection} from 'shared/utils/*';

type ContactMethodProps = {
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  label: string;
  onPress: () => void;
};

export const ContactMethod: React.FC<ContactMethodProps> = ({iconName, label, onPress}) => {
  const {flexDirection, textAlign} = useDirection();

  return (
    <TouchableOpacity style={[footerStyles.contactRow, {flexDirection}]} onPress={onPress}>
      <MaterialCommunityIcons name={iconName} size={20} color={colors.surface} />
      <Text style={[footerStyles.contactText, {textAlign}]}>{label}</Text>
    </TouchableOpacity>
  );
};
