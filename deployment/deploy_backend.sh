#!/bin/bash

source ~/.bashrc

eval $(ssh-agent)
ssh-add ~/.ssh/id_rsa

ssh -p $HOMEPAGE_SSH_PORT -t "${HOMEPAGE_USER}@${HOMEPAGE_IP}" "sudo systemctl stop ${HOMEPAGE_BACKEND_SERVICE}"

cd ../backend/
export GOOS=linux
go build -o backend

scp -P $HOMEPAGE_SSH_PORT ./backend "${HOMEPAGE_USER}@${HOMEPAGE_IP}:${HOMEPAGE_BACKEND_DIR}"
ssh -p $HOMEPAGE_SSH_PORT -t "${HOMEPAGE_USER}@${HOMEPAGE_IP}" "sudo chmod u+x ${HOMEPAGE_BACKEND_DIR}backend &&  sudo systemctl enable ${HOMEPAGE_BACKEND_SERVICE} && sudo systemctl start ${HOMEPAGE_BACKEND_SERVICE}"
