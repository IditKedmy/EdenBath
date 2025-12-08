import {useLanguageStore} from '../state';
import {useWindowDimensions} from 'react-native';

export const useDirection = () => {
  const {isRTL, language} = useLanguageStore();
  const {width} = useWindowDimensions();
  const isMobile = width < 768;

  return {
    isRTL,
    isLTR: !isRTL,
    language,
    isMobile,
    isWeb: !isMobile,
    direction: isRTL ? ('rtl' as const) : ('ltr' as const),
    flexDirection: isRTL ? ('row-reverse' as const) : ('row' as const),
    textAlign: isRTL ? ('right' as const) : ('left' as const),
  };
};
