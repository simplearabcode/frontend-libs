/**
 * API configuration
 */

import type { ApiConfig, ApiEndpoints } from '../types/config';

export const apiConfig: ApiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
} as const;

export const endpoints: ApiEndpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
  },
  users: {
    list: '/users',
    detail: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
  },
  courses: {
    list: '/courses',
    detail: (id: string) => `/courses/${id}`,
    enroll: (id: string) => `/courses/${id}/enroll`,
  },
} as const;
