#!/bin/sh
set -euxo pipefail

APP_ENV="production"
APP_VERSION=${BITBUCKET_TAG:-}
BUILD_NUMBER=${BITBUCKET_BUILD_NUMBER:-unknown}
BUILDER=${USER}@$(hostname 2>/dev/null || echo 'ci')
BUILD_DATE=$(date '+%Y-%m-%d__%H:%M:%S')
COMMIT=$(git rev-parse HEAD 2>/dev/null || echo ${BITBUCKET_COMMIT:-unknown})
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo ${BITBUCKET_TAG:-$BITBUCKET_BRANCH})
APP_VERSION=${APP_VERSION:-$(jq -r '.version' package.json)}
APP_VERSION=${APP_VERSION}-${APP_ENV}
GIT_HASH=${BRANCH}@${COMMIT}

export DOCKER_BUILDKIT=${DOCKER_BUILDKIT:-1}
DOCKER_PROGRESS=${DOCKER_PROGRESS:-tty}

echo '@> Building backend image...'
echo "@=> APP_ENV=${APP_ENV}"
echo "@=> APP_VERSION=${APP_VERSION}"
echo "@=> GIT_HASH=${GIT_HASH}"
echo "@=> BUILDER=${BUILDER}"
echo "@=> BUILD_DATE=${BUILD_DATE}"
echo "@=> BUILD_NUMBER=${BUILD_NUMBER}"
echo ''

docker build --progress=${DOCKER_PROGRESS} \
-t sai:site \
--build-arg APP_ENV=${APP_ENV} \
--build-arg APP_VERSION=${APP_VERSION} \
--build-arg GIT_HASH=${GIT_HASH} \
--build-arg BUILDER=${BUILDER} \
--build-arg BUILD_DATE=${BUILD_DATE} \
--build-arg BUILD_NUMBER=${BUILD_NUMBER} \
--target=production-stage \
.
