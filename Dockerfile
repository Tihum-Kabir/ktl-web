# Use Node.js Alpine image for a small footprint
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies (use ci for reliable builds)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the Next.js application
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose port (Next.js defaults to 3000)
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
