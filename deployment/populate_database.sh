#!/bin/bash

source ~/.bashrc

eval $(ssh-agent)
ssh-add ~/.ssh/id_rsa

scp -P $HOMEPAGE_SSH_PORT ../database/person_data.json "${HOMEPAGE_USER}@${HOMEPAGE_IP}:~/"
ssh -p $HOMEPAGE_SSH_PORT "${HOMEPAGE_USER}@${HOMEPAGE_IP}" << EOF
cd ~
curl -X POST http://localhost:3000/api/person -H "Content-Type: application/json" -d "@person_data.json"
rm person_data.json
EOF
