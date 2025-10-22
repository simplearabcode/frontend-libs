# ============================================
# Multi-stage Dockerfile for Production Build
# ============================================

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml* .npmrc* ./

# Install dependencies
RUN pnpm install --frozen-lockfile --prod=false

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build the package
RUN pnpm build

# Stage 3: Production
FROM node:20-alpine AS production
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files (pnpm-lock.yaml required, .npmrc excluded in .dockerignore)
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built assets from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/README.md ./README.md

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port (if needed for preview/testing)
EXPOSE 3000

# Default command (can be overridden)
CMD ["node", "--version"]

# Metadata
LABEL maintainer="Simple Arab Code"
LABEL description="Frontend Libs Package for Simple Arab Code"
LABEL version="1.0.0"
LABEL org.opencontainers.image.source="https://github.com/simplearabcode/frontend-libs"
