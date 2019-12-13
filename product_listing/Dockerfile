#####################
# DEVELOPMENT IMAGE #
#####################

# Pull base image
FROM node:12.13 AS product-listing-builder

# Set environment variables
ENV NODE_ENV dev

# Set work directory
WORKDIR /code

# Install dependencies
COPY ./product_listing/package.json ./product_listing/package-lock.json /code/
RUN npm install

# Copy project
COPY ./product_listing /code/
COPY ./protos /code/

# Copy TLS certificate
COPY ./server.crt /code/

# Run starting command
CMD ["npm", "run", "start-dev"]

#####################
# PRODUCTION IMAGE #
#####################

# Pull base image
FROM node:12.13 AS product-listing-prod

# Set work directory
WORKDIR /code

# Install production dependencies
COPY ./product_listing/package.json ./product_listing/package-lock.json /code/
RUN npm install --only=production

# Copy source code, protos
COPY --from=product-listing-builder /code/src /code/protos /code/

# Run starting command
CMD ["npm", "run", "start"]