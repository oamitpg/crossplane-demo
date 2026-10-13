# Multi-stage build, run from this directory:  sudo docker build -t lab/backstage:<tag> .
# Everything (install, compile, bundle) happens in Node 24 so native modules match the runtime.

FROM node:24-trixie-slim AS packages
WORKDIR /app
COPY backstage.json package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY packages packages
COPY plugins plugins
# Keep only package.json files: the install layer then caches until dependencies change.
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -exec rm -rf {} \+

FROM node:24-trixie-slim AS build
ENV PYTHON=/usr/bin/python3
RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 g++ build-essential libsqlite3-dev && \
    rm -rf /var/lib/apt/lists/*
USER node
WORKDIR /app
COPY --from=packages --chown=node:node /app .
RUN yarn install --immutable
COPY --chown=node:node . .
ENV NODE_OPTIONS=--max-old-space-size=3072
RUN yarn build:all
RUN mkdir packages/backend/dist/skeleton packages/backend/dist/bundle && \
    tar xzf packages/backend/dist/skeleton.tar.gz -C packages/backend/dist/skeleton && \
    tar xzf packages/backend/dist/bundle.tar.gz -C packages/backend/dist/bundle

FROM node:24-trixie-slim
ENV PYTHON=/usr/bin/python3
RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 python3-venv g++ build-essential libsqlite3-dev && \
    python3 -m venv /opt/techdocs && \
    /opt/techdocs/bin/pip install --no-cache-dir mkdocs-techdocs-core && \
    rm -rf /var/lib/apt/lists/*
ENV PATH=/opt/techdocs/bin:$PATH
USER node
WORKDIR /app
COPY --from=build --chown=node:node /app/.yarn ./.yarn
COPY --from=build --chown=node:node /app/.yarnrc.yml /app/backstage.json ./
ENV NODE_ENV=production
COPY --from=build --chown=node:node /app/yarn.lock /app/package.json /app/packages/backend/dist/skeleton/ ./
RUN yarn workspaces focus --all --production && rm -rf "$(yarn cache clean)"
COPY --from=build --chown=node:node /app/packages/backend/dist/bundle/ ./
COPY --chown=node:node app-config.yaml app-config.production.yaml ./
CMD ["node", "packages/backend", "--config", "app-config.yaml", "--config", "app-config.production.yaml"]
