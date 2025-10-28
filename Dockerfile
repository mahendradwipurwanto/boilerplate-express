# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# package-Dateien kopieren
COPY package*.json tsconfig*.json ./
RUN npm install

# Source-Code kopieren
COPY src ./src
COPY global.d.ts ./

# TypeScript build (inkl. Debug-Ausgabe)
RUN npx tsc -p tsconfig.release.json && ls -R dist

# ---- Runtime Stage ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Gebauten Code übernehmen
COPY --from=builder /app/dist ./dist

# Start der Anwendung
CMD ["node", "dist/main.js"]
