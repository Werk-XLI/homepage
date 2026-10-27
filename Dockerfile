FROM node:lts-trixie-slim AS base
WORKDIR /app

# By copying only the package.json and package-lock.json here, we ensure that the following `-deps` steps are independent of the source code.
# Therefore, the `-deps` steps will be skipped if only the source code changes.
COPY package.json package-lock.json ./

FROM base AS prod-deps
RUN npm ci --omit=dev

FROM base AS build-deps
RUN npm ci

FROM build-deps AS build
COPY . .
RUN npm run build

FROM base AS runtime
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Files stay owned by root, the app runs as the unprivileged "node" user
# and therefore cannot modify its own code at runtime.
USER node

EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
