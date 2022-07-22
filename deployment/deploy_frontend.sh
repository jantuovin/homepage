#!/bin/bash

source ~/.bashrc

eval $(ssh-agent)
ssh-add ~/.ssh/id_rsa

cd ../frontend/
npm run build
cd ./dist/
tar -czvf frontend.tar.gz ./

scp -P $HOMEPAGE_SSH_PORT ./frontend.tar.gz "${HOMEPAGE_USER}@${HOMEPAGE_IP}:${HOMEPAGE_FRONTEND_DIR}"
ssh -p $HOMEPAGE_SSH_PORT "${HOMEPAGE_USER}@${HOMEPAGE_IP}" "cd ${HOMEPAGE_FRONTEND_DIR} && tar -xzvf frontend.tar.gz && rm ./frontend.tar.gz"