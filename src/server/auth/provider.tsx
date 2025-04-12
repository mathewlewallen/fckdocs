'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Appearance, Theme } from '@clerk/types';
import { useTheme } from '@fck/components/ui';
import type * as React from 'react'

const AuthProvider: React.FC<React.ComponentProps<typeof ClerkProvider>> = (props) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const baseTheme = isDark ? dark : undefined;

  const layout: Appearance['layout'] = {
    animations: true,
    showOptionalFields: true,
    socialButtonsPlacement: 'top',
    socialButtonsVariant: 'blockButton',
    termsPageUrl: '/legal/terms-and-conditions',
    privacyPageUrl: '/legal/privacy-policy',
    helpPageUrl: '/contact',
    logoPlacement: 'none',
    shimmer: true,
    unsafe_disableDevelopmentModeWarnings: true,
  };

  const variables: Appearance['variables'] = {
    colorPrimary: isDark ? '#cccccc' : '#3a3a3a',
    colorDanger: isDark ? '#663333' : '#aa3333',
    colorSuccess: isDark ? '#40785f' : '#3ccf90',
    colorWarning: isDark ? '#998a4d' : '#f9e79f',
    colorNeutral: isDark ? '#ebebeb' : '#3a3a3a',
    colorText: isDark ? '#ebebeb' : '#3a3a3a',
    colorTextSecondary: isDark ? '#bbbbbb' : '#5a5a5a',
    colorTextOnPrimaryBackground: isDark ? '#ffffff' : '#2a2a2a',
    colorBackground: isDark ? '#1c1c1c' : '#f4f4f4',
    colorInputBackground: isDark ? '#282828' : '#e7e7e7',
    colorInputText: isDark ? '#ffffff' : '#1a1a1a',
    colorShimmer: isDark ? '#404040' : '#dcdcdc',
    fontFamily: 'inherit',
    fontWeight: {
      normal: 500,
      medium: 600,
      bold: 700,
    },
    borderRadius: '0.625rem',
    spacingUnit: '1rem',
    fontSize: '0.875rem',
  };

  const elements: Theme['elements'] = {
    dividerLine: 'bg-border',
    socialButtonsIconButton: 'bg-card',
    navbarButton: 'text-foreground',
    organizationSwitcherTrigger__open: 'bg-background',
    organizationPreviewMainIdentifier: 'text-foreground',
    organizationSwitcherTriggerIcon: 'text-muted-foreground',
    organizationPreview__organizationSwitcherTrigger: 'gap-2',
    organizationPreviewAvatarContainer: 'shrink-0',
    formButtonPrimary: {
      background: 'var(--color-primary)',
      fontWeight: 'medium',
      fontSize: '0.875rem',
      border: '1px solid var(--color-ring)',
      borderRadius: '0.5rem',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        background: 'var(--color-muted)',
        outline: '2px ridge var(--color-ring)',
      },
      '&:focus': {
        borderColor: 'var(--color-ring)',
        outline: '2px solid var(--color-ring)',
        outlineOffset: '2px',
      },
    },
    formFieldInput: {
      background: 'var(--color-input)',
      fontWeight: 'medium',
      fontSize: '0.875rem',
      border: '1px solid var(--color-ring)',
      borderRadius: '0.5rem',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        background: 'var(--color-muted)',
        outline: '2px ridge var(--color-ring)',
      },
      '&:focus': {
        background: 'var(--color-background)',
        borderColor: 'var(--color-ring)',
        outline: '2px solid var(--color-ring)',
        outlineOffset: '2px',
      },
    },
    formFieldCheckboxLabel: {
      color: 'var(--color-foreground)',
      '& a': {
        color: 'var(--color-primary)',
        textDecoration: 'underline',
        transition: 'color 0.2s ease-in-out',
      },
      '& a:hover': {
        color: 'var(--color-ring)',
      },
    },
    footer: {
      background: 'var(--color-muted)',
      textAlign: 'center',
      marginTop: '-1rem',
    },
    footerActionText: {
      fontWeight: 'medium',
      color: 'var(--color-foreground)',
      marginRight: '.8rem',
    },
    footerActionLink: {
      fontWeight: 'medium',
      color: 'var(--color-primary)',
      borderBottom: '2px solid var(--color-primary)',
      '&:hover': {
        color: 'var(--color-ring)',
        borderBottom: '2px solid var(--color-ring)',
        opacity: 0.8,
      },
    },
  };

  return (
    <ClerkProvider
      {...props}
      appearance={{ baseTheme, elements, layout, variables }}
    />
  );
}

export default AuthProvider;