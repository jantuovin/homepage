#!/bin/bash

source ~/.bashrc

eval $(ssh-agent)
ssh-add ~/.ssh/id_rsa

scp -P $HOMEPAGE_SSH_PORT ../database/docker-compose.yml "${HOMEPAGE_USER}@${HOMEPAGE_IP}:${HOMEPAGE_DATABASE_DIR}"
ssh -p $HOMEPAGE_SSH_PORT "${HOMEPAGE_USER}@${HOMEPAGE_IP}" << EOF
cd "${HOMEPAGE_DATABASE_DIR}"
docker-compose down
docker-compose up -d
EOF
