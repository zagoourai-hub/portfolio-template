FROM node:20-alpine AS base

# 1. Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY portfolio/package.json portfolio/package-lock.json ./
RUN npm ci

# 2. Rebuild the source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY portfolio/ ./

# Set environment variables for production build
ENV DATABASE_URL="file:/databases/dev.db"
ENV NODE_ENV=production

# Run Prisma generate and next build
RUN npx prisma generate
RUN npm run build

# 3. Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Setup non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy files
COPY --from=builder /app ./

# Create databases directory and set permissions
RUN mkdir -p /databases && chown -R nextjs:nodejs /databases /app

USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]
