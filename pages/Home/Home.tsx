import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Header, Footer, WhatsAppButton} from 'shared/components/*';
import {useDirection} from 'shared/utils/*';
import {HeroSection} from 'pages/Home/components/HeroSection';
import {CategoriesSection} from 'pages/Home/components/CategoriesSection';
import {colors} from 'theme/colors';

export default function HomeScreen() {
  const {t} = useTranslation();
  const {isMobile} = useDirection();

  return (
    <View style={styles.container}>
      <Header title={t('homeTitle')} isHome />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <HeroSection />
        <CategoriesSection isMobile={isMobile} />
        <Footer />
      </ScrollView>
      <WhatsAppButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
});
