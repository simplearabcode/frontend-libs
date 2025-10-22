# Shared Libraries

Cross-cutting utilities and resources used across the entire application.

## 📦 Modules

### `utils/`
Pure utility functions for common operations.

**Examples:**
- Date formatting and manipulation
- String operations
- Number formatting
- Array/Object helpers
- Validation helpers

```typescript
// Example: libs/shared/utils/src/date.ts
export const formatDate = (date: Date, format: string): string => {
  // Implementation
};

export const addDays = (date: Date, days: number): Date => {
  // Implementation
};
```

### `types/`
Global TypeScript type definitions.

**Examples:**
- API response types
- Common entity types
- Utility types

```typescript
// Example: libs/shared/types/src/api.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
```

### `constants/`
Application-wide constant values.

**Examples:**
- API endpoints
- Configuration values
- Enum-like constants

```typescript
// Example: libs/shared/constants/src/endpoints.ts
export const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
  },
  COURSES: {
    LIST: '/api/courses',
    DETAIL: (id: string) => `/api/courses/${id}`,
  },
} as const;
```

### `hooks/`
Reusable React hooks.

**Examples:**
- `useDebounce` - Debounce values
- `useLocalStorage` - Persist state to localStorage
- `useMediaQuery` - Responsive breakpoints
- `useClickOutside` - Detect clicks outside element

```typescript
// Example: libs/shared/hooks/src/useDebounce.ts
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

### `contexts/`
Global React contexts.

**Examples:**
- Theme context
- Toast/Notification context
- Feature flag context

```typescript
// Example: libs/shared/contexts/src/ThemeContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

### `guards/`
Route guards and permission checks.

**Examples:**
- Authentication guards
- Role-based access control
- Feature flag guards

```typescript
// Example: libs/shared/guards/src/AuthGuard.tsx
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@simple-arab-code/feature-auth';

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
```

### `validators/`
Input validation schemas.

**Examples:**
- Zod schemas
- Yup schemas
- Custom validators

```typescript
// Example: libs/shared/validators/src/auth.schemas.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
```

### `config/`
Configuration management.

**Examples:**
- Environment configuration
- Feature flags
- App settings

```typescript
// Example: libs/shared/config/src/env.ts
export const config = {
  api: {
    baseUrl: process.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 30000,
  },
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
  },
  features: {
    enableAnalytics: process.env.VITE_ENABLE_ANALYTICS === 'true',
    enableSocialLogin: process.env.VITE_ENABLE_SOCIAL_LOGIN === 'true',
  },
} as const;
```

## 🎯 Usage Guidelines

### 1. Keep It Pure
Shared utilities should be pure functions without side effects when possible.

### 2. No Feature Dependencies
Shared libraries should not depend on feature libraries.

### 3. Well Documented
Every export should have JSDoc comments.

### 4. Well Tested
Aim for 80%+ test coverage on shared utilities.

### 5. Backward Compatible
Maintain backward compatibility when updating shared code.

## 📝 Adding New Shared Code

1. Determine the correct module (utils, types, hooks, etc.)
2. Create the implementation
3. Export from the module's index.ts
4. Add tests
5. Update documentation

## 🧪 Testing

```bash
# Test all shared libraries
nx test shared-utils
nx test shared-hooks
nx test shared-validators
```

---

_Part of the Simple Arab Code Platform_
