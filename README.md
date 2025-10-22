# @simplearabcode/frontend-libs

> Modern, production-ready UI component library for Simple Arab Code platform

[![CI](https://github.com/simplearabcode/frontend-libs/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/simplearabcode/frontend-libs/actions)
[![Publish](https://github.com/simplearabcode/frontend-libs/workflows/Publish%20Package/badge.svg)](https://github.com/simplearabcode/frontend-libs/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive UI component library built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**. Fully tested, containerized, and automatically published to GitHub Packages.

---

## ✨ Features

- 🎨 **Tailwind CSS v4** - Using modern `@theme` directive (no config file!)
- 🧩 **shadcn/ui** - Beautiful, accessible components built on Radix UI
- 📦 **Dual Format** - ESM and CJS builds for maximum compatibility
- 🔒 **Type-Safe** - Full TypeScript support with declaration files
- 🧪 **Well Tested** - 12 passing tests with Vitest + React Testing Library
- 🐳 **Docker Ready** - Multi-stage production builds
- 🚀 **CI/CD** - Automated testing, building, and publishing
- 🌙 **Dark Mode** - Built-in dark mode support
- ♿ **Accessible** - WCAG compliant components

---

## 📦 Installation

### Prerequisites

You need a GitHub Personal Access Token with `read:packages` permission.

**Create token**: https://github.com/settings/tokens/new

### Setup

```bash
# 1. Configure npm registry (in your project)
echo "@simplearabcode:registry=https://npm.pkg.github.com" >> .npmrc

# 2. Authenticate (in ~/.npmrc with your token)
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc

# 3. Install the package
pnpm add @simplearabcode/frontend-libs
# or
npm install @simplearabcode/frontend-libs
# or
yarn add @simplearabcode/frontend-libs
```

---

## 🚀 Quick Start

### Basic Usage

```typescript
import { Button, cn } from '@simplearabcode/frontend-libs';
import '@simplearabcode/frontend-libs/styles';

function App() {
  return (
    <div className="p-8">
      <Button variant="default" size="lg">
        Click Me
      </Button>
      
      <Button variant="destructive">
        Delete
      </Button>
      
      <Button variant="outline" size="sm">
        Cancel
      </Button>
    </div>
  );
}
```

### Using the cn() Utility

```typescript
import { cn } from '@simplearabcode/frontend-libs';

function MyComponent({ className }) {
  return (
    <div className={cn(
      "base-class",
      "text-lg font-bold",
      className
    )}>
      Content
    </div>
  );
}
```

---

## 📚 Available Components

### Button
Full-featured button component with multiple variants and sizes.

```typescript
<Button variant="default | destructive | outline | secondary | ghost | link">
  Button Text
</Button>

<Button size="default | sm | lg | icon | icon-sm | icon-lg">
  Sized Button
</Button>

<Button disabled>Disabled Button</Button>

<Button asChild>
  <a href="/link">Link as Button</a>
</Button>
```

### cn() Utility
Tailwind CSS class name merger with conflict resolution.

```typescript
cn("px-2 py-1", "px-4") // => "py-1 px-4" (conflict resolved)
cn("text-lg", condition && "font-bold") // Conditional classes
cn(["foo", "bar"], "baz") // Arrays supported
```

---

## 🏗️ Project Structure

```
libs/
├── __tests__/              # Test files
│   ├── button.test.tsx    # Button component tests
│   └── cn.test.ts         # Utility function tests
├── .github/
│   └── workflows/
│       ├── ci.yml         # CI pipeline
│       └── publish.yml    # Publishing workflow
├── shared/
│   └── utils/
│       └── cn.ts          # Class name utility
├── styles/
│   └── globals.css        # Tailwind v4 config + styles
├── ui/
│   └── components/
│       ├── button.tsx     # Button component
│       └── index.ts       # Component exports
├── Dockerfile             # Multi-stage production build
├── docker-compose.yml     # Docker services
├── vitest.config.mts      # Test configuration
├── vite.config.ts         # Build configuration
└── index.ts               # Main entry point
```

---

## 🧪 Development

### Install Dependencies

```bash
pnpm install
```

### Run Tests

```bash
# Run tests once
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage

# UI mode
pnpm test:ui
```

### Build Package

```bash
# Production build
pnpm build

# Output: dist/index.js, dist/index.mjs, dist/ui-kit.css
```

### Type Check

```bash
pnpm type-check
```

---

## 🐳 Docker

### Build Docker Image

```bash
# Using pnpm script
pnpm docker:build

# Using docker directly
docker build -t simplearabcode/frontend-libs:latest .

# Using docker-compose
docker-compose build frontend-libs-prod
```

### Run Container

```bash
# Using docker-compose
docker-compose up -d frontend-libs-prod

# View logs
docker logs -f frontend-libs-prod
```

---

## 🎨 Adding New Components

### Using shadcn/ui CLI

```bash
# Add any shadcn component
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
```

Components will be added to `ui/components/` automatically.

### Export New Components

Update `index.ts`:

```typescript
// Add new component exports
export { Button, buttonVariants } from './ui/components/button';
export { Card, CardHeader, CardContent, CardFooter } from './ui/components/card';
export { Input } from './ui/components/input';
```

### Rebuild

```bash
pnpm build
pnpm test
```

---

## 🚀 Publishing

### Automatic Publishing

Publishing happens automatically via GitHub Actions:

```bash
# Push to main branch
git add .
git commit -m "feat: add new component"
git push origin main
```

GitHub Actions will:
1. ✅ Run tests
2. ✅ Build package
3. ✅ Publish to GitHub Packages
4. ✅ Build Docker image

### Version-Tagged Release

```bash
# Update version
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0

# Push with tags
git push origin main --tags
```

This creates:
- npm package at specific version
- Docker image with version tag
- GitHub Release with notes

### Manual Publishing

1. Go to **Actions** tab on GitHub
2. Select **"Publish Package"** workflow
3. Click **"Run workflow"**
4. Select branch and click **"Run"**

---

## 📖 Documentation

- **[GETTING-STARTED.md](./GETTING-STARTED.md)** - Quick start guide
- **[PUBLISH-GUIDE.md](./PUBLISH-GUIDE.md)** - Publishing instructions
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment guide
- **[DOCKER-SETUP.md](./DOCKER-SETUP.md)** - Docker details
- **[TAILWIND-V4.md](./TAILWIND-V4.md)** - Tailwind CSS v4 guide
- **[.github/workflows/README.md](./.github/workflows/README.md)** - Workflows documentation

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI library |
| TypeScript | 5.9.3 | Type safety |
| Tailwind CSS | 4.1.15 | Styling |
| Vite | 7.0.0 | Build tool |
| Vitest | 2.1.9 | Testing |
| shadcn/ui | latest | Component library |
| Docker | - | Containerization |
| GitHub Actions | - | CI/CD |

---

## 📊 Package Stats

| Metric | Value |
|--------|-------|
| **Package Size** | ~30 KB (gzip: ~10 KB) |
| **CSS Size** | ~17 KB (gzip: ~4 KB) |
| **Docker Image** | ~200 MB (Alpine-based) |
| **Test Coverage** | 12/12 tests passing |
| **Build Time** | ~800ms |

---

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

---

## 📜 License

MIT © [Simple Arab Code](https://github.com/simplearabcode)

---

## 🔗 Links

- **Package**: https://github.com/orgs/simplearabcode/packages/npm/package/frontend-libs
- **Repository**: https://github.com/simplearabcode/frontend-libs
- **Issues**: https://github.com/simplearabcode/frontend-libs/issues
- **Docker Images**: https://github.com/simplearabcode/frontend-libs/pkgs/container/frontend-libs

---

## 💬 Support

For questions and support:
- Open an issue on GitHub
- Check the documentation in the repo
- Review existing issues and discussions

---

**Built with ❤️ by Simple Arab Code Team**

_Last updated: October 2025_
