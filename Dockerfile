# FROM imbios/bun-node:18-slim AS deps
# ARG DEBIAN_FRONTEND=noninteractive

# # I use Asia/Jakarta as my timezone, you can change it to your timezone
# RUN apt-get -y update && \
#     apt-get install -yq openssl git ca-certificates tzdata && \
#     ln -fs /usr/share/zoneinfo/Asia/Jakarta /etc/localtime && \
#     dpkg-reconfigure -f noninteractive tzdata
# WORKDIR /app

# # Install dependencies based on the preferred package manager
# COPY package.json bun.lockb ./
# RUN bun install --frozen-lockfile

# # Build the app
# FROM deps AS builder
# WORKDIR /app
# COPY . .

# RUN bun run build


# # Production image, copy all the files and run next
# FROM node:18-slim AS runner
# WORKDIR /app

# COPY ./.env.production /app/.env
# ENV NODE_ENV production
# # Uncomment the following line in case you want to disable telemetry during runtime.
# # ENV NEXT_TELEMETRY_DISABLED 1

# COPY --from=builder  /app/.next ./
# COPY --from=builder  /app/public ./public
# # COPY --from=builder  /app/.next/static ./.next/static

# EXPOSE 3003

# CMD ["node", "server.js"]


# Base image with bun and node
FROM oven/bun:1.1.15 AS deps

ARG DEBIAN_FRONTEND=noninteractive

# Set timezone and install necessary packages
RUN apt-get -y update && \
    apt-get install -yq openssl git ca-certificates tzdata && \
    ln -fs /usr/share/zoneinfo/Asia/Jakarta /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lockb for dependency installation
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the entire project
COPY . .

# Build the project
RUN bun run build

# Production stage
FROM oven/bun:1.1.15 AS runner

# Set the working directory
WORKDIR /app

# Set environment variables
COPY ./.env.production .env

# Copy necessary files from the builder stage
COPY --from=deps /app/.next ./.next
COPY --from=deps /app/public ./public
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/node_modules ./node_modules

# Expose the application port
EXPOSE 3003

# Start the application
CMD ["bun", "start"]
