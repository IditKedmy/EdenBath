import {View, StyleSheet} from 'react-native';
import {useDirection} from '../../utils';
import {colors, spacing} from 'theme';
import {AboutSection} from './components/AboutSection';
import {QuickNavigation} from './components/QuickNavigation';
import {ContactSection} from './components/ContactSection';
import {CopyrightSection} from './components/CopyrightSection';
import {footerStyles} from './styles';

export function Footer() {
  const {isMobile, flexDirection} = useDirection();

  return (
    <View style={styles.container}>
      <View style={{flexDirection: isMobile ? 'column' : flexDirection}}>
        <View style={[footerStyles.section, isMobile && footerStyles.mobileSection]}>
          <AboutSection />
        </View>

        <View style={[footerStyles.section, isMobile && footerStyles.mobileSection]}>
          <QuickNavigation />
        </View>

        <View style={[footerStyles.section, isMobile && footerStyles.mobileSection]}>
          <ContactSection />
        </View>
      </View>

      <CopyrightSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    justifyContent: 'space-between',
  },
});
