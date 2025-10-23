/**
 * Configuration related types
 */

/**
 * API Configuration
 */
export interface ApiConfig {
  readonly baseUrl: string;
  readonly timeout: number;
  readonly headers: {
    readonly 'Content-Type': string;
    readonly Accept: string;
  };
  readonly withCredentials: boolean;
}

/**
 * API Endpoints structure
 */
export interface ApiEndpoints {
  readonly auth: {
    readonly login: string;
    readonly register: string;
    readonly logout: string;
    readonly refresh: string;
    readonly me: string;
  };
  readonly users: {
    readonly list: string;
    readonly detail: (id: string) => string;
    readonly update: (id: string) => string;
    readonly delete: (id: string) => string;
  };
  readonly courses: {
    readonly list: string;
    readonly detail: (id: string) => string;
    readonly enroll: (id: string) => string;
  };
}

/**
 * Application Configuration
 */
export interface AppConfig {
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly locale: string;
  readonly defaultLocale: string;
  readonly supportedLocales: readonly string[];
}

/**
 * Feature Flags
 */
export interface FeatureFlags {
  readonly enableDarkMode: boolean;
  readonly enableNotifications: boolean;
  readonly enableAnalytics: boolean;
  readonly enableDebugMode: boolean;
}

/**
 * Theme Configuration
 */
export interface ThemeConfig {
  readonly defaultTheme: 'light' | 'dark' | 'system';
  readonly storageKey: string;
}

/**
 * Environment Variables (type-safe)
 */
export interface EnvironmentConfig {
  NEXT_PUBLIC_API_URL?: string;
  NEXT_PUBLIC_APP_URL?: string;
  NODE_ENV?: 'development' | 'production' | 'test';
}
