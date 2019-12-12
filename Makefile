DOCKER_CMP_COMMAND=docker-compose
DOCKER_CMP_COMMAND_EXEC=$(DOCKER_CMP_COMMAND) exec 

runservers:
	$(DOCKER_CMP_COMMAND) up --build

test:
	$(DOCKER_CMP_COMMAND_EXEC) discount_calculator pytest && \
	$(DOCKER_CMP_COMMAND_EXEC) product_listing npm run test

shutdown:
	$(DOCKER_CMP_COMMAND) down

shutdown-discount:
	$(DOCKER_CMP_COMMAND) stop discount_calculator