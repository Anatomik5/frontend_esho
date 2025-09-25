#!/bin/sh
if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi
set -e

PATH_=$(pwd)
/bin/cp esho_frontend esho_frontend.temp
/bin/sed -i -e "s@SERVER_DIR@$PATH_@g" esho_frontend.temp
/bin/mv esho_frontend.temp /etc/systemd/system/esho_frontend.service
/bin/systemctl daemon-reload
/bin/systemctl enable esho_frontend.service
/bin/systemctl start esho_frontend.service