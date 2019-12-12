# Pull base image
FROM postgres:12.0

# Copy seed files
COPY ./seed/seed.sh /docker-entrypoint-initdb.d/20-seed.sh
COPY ./seed/dump.sql /dump.sql

# Change permissions for entrypoint
RUN chmod +x /docker-entrypoint-initdb.d/20-seed.sh
