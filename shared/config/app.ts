/**
 * Application configuration
 */

import type { AppConfig, FeatureFlags, ThemeConfig } from '../types/config';

export const appConfig: AppConfig = {
  name: 'Simple Arab Code',
  description: 'Learn to code in Arabic',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4200',
  locale: 'ar',
  defaultLocale: 'ar',
  supportedLocales: ['ar', 'en'],
} as const;

export const featureFlags: FeatureFlags = {
  enableDarkMode: true,
  enableNotifications: true,
  enableAnalytics: process.env.NODE_ENV === 'production',
  enableDebugMode: process.env.NODE_ENV === 'development',
} as const;

export const themeConfig: ThemeConfig = {
  defaultTheme: 'light',
  storageKey: 'theme-preference',
} as const;
