#! /bin/bash

set -e

echo "Populating Database..."
psql -d ${POSTGRES_DB} -a -U${POSTGRES_USER} -f /dump.sql

exit 0