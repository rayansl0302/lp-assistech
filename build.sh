#!/bin/sh

set -e

APP_ENV="production"
APP_VERSION=${BITBUCKET_TAG}
BUILD_NUMBER=${BITBUCKET_BUILD_NUMBER:=unknown}
BUILDER=${USER}@$(hostname 2> /dev/null && echo $? | tail -0 || echo 'ci')
BUILD_DATE=$(date '+%Y-%m-%d__%H:%M:%S')
COMMIT=$(git rev-parse HEAD 2> /dev/null && echo $? | tail -0 || echo $BITBUCKET_COMMIT)
BRANCH=$(git rev-parse --abbrev-ref HEAD 2> /dev/null && echo $? | tail -0 || echo '')

if [ -z "$APP_VERSION" ]
then
  APP_VERSION=$(jq -r '.version' package.json)
fi

APP_VERSION=${APP_VERSION}-${APP_ENV}

if [ -z "$BRANCH" ]
then
  BRANCH=${BITBUCKET_TAG:=$BITBUCKET_BRANCH}
fi

if [ -z "$DOCKER_BUILDKIT" ]
then
  DOCKER_BUILDKIT=1
fi

if [ -z "$DOCKER_PROGRESS" ]
then
  DOCKER_PROGRESS=tty
fi

GIT_HASH=${BRANCH}@${COMMIT}

echo '@> Building backend image...'
echo "@=> APP_ENV=${APP_ENV}"
echo "@=> APP_VERSION=${APP_VERSION}"
echo "@=> GIT_HASH=${GIT_HASH}"
echo "@=> BUILDER=${BUILDER}"
echo "@=> BUILD_DATE=${BUILD_DATE}"
echo "@=> BUILD_NUMBER=${BUILD_NUMBER}"

echo ''

DOCKER_BUILDKIT=${DOCKER_BUILDKIT} docker build --progress=${DOCKER_PROGRESS} \
-t sai:site \
--build-arg APP_ENV=${APP_ENV} \
--build-arg APP_VERSION=${APP_VERSION} \
--build-arg GIT_HASH=${GIT_HASH} \
--build-arg BUILDER=${BUILDER} \
--build-arg BUILD_DATE=${BUILD_DATE} \
--build-arg BUILD_NUMBER=${BUILD_NUMBER} \
--target=production-stage \
.
