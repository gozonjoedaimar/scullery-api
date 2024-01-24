#!/bin/bash

# check if .build_* file exists on the current folder and restart scullerflowapp.service and delete .build_* file
if [ -f ./.build_* ]; then
    systemctl restart sculleryflowapi
    rm ./.build_*
    echo "sculleryflowapi service restarted"
fi

# cron usage
# * * * * * cd /path/to/project && ./service_cron.sh >> ./cron.log 2>&1