DOCKER_CMP_COMMAND=docker-compose
DOCKER_CMP_COMMAND_EXEC=$(DOCKER_CMP_COMMAND) exec 

runservers:
	$(DOCKER_CMP_COMMAND) up --build

test:
	$(DOCKER_CMP_COMMAND_EXEC) discount_calculator pytest