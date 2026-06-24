# ----------------------------------------------------------------------------
# Dockerfile for the KIMONO Art Nails API.
# Works for Koyeb (Docker deploy) and any other container host.
# Koyeb can also deploy this folder via Buildpacks without a Dockerfile, but
# shipping one keeps the build reproducible.
# ----------------------------------------------------------------------------
FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

# Install production dependencies first (better layer caching)
COPY package.json ./
COPY package-lock.json* ./
RUN npm install --omit=dev

# Copy source
COPY . .

# Koyeb/Render inject PORT; default to 3000 for local container runs.
ENV PORT=3000
EXPOSE 3000

CMD ["node", "src/index.js"]
