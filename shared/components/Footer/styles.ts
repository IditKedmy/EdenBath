import {StyleSheet} from 'react-native';
import {colors, spacing, typography} from 'theme';

export const footerStyles = StyleSheet.create({
  section: {
    flex: 1,
    marginBottom: spacing.md,
    width: '90%',
  },
  mobileSection: {
    marginBottom: spacing.lg,
  },
  footerLogo: {
    width: 'auto',
    height: 60,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  brandText: {
    ...typography.bodySmall,
    color: colors.surface,
    lineHeight: 20,
    width: '90%',
  },
  link: {
    ...typography.bodySmall,
    color: colors.surface,
    marginBottom: spacing.sm,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  contactText: {
    ...typography.bodySmall,
    color: colors.surface,
  },
  copyrightContainer: {
    width: '100%',
    marginTop: spacing.md,
    paddingTop: spacing.md,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.sm,
  },
  copyright: {
    ...typography.caption,
    color: colors.surface,
    alignSelf: 'center',
  },
});
