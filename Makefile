DOCKER = docker
DOCKER_COMPOSE = docker compose -f docker/docker-compose.yml
PROJECT_NAME = ZOO-BACKEND
#test


help: ##Show this help
	@echo
	@echo "Choose a command to run in "$(PROJECT_NAME)":"
	@echo
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

start:
	$(DOCKER_COMPOSE) up -d
.PHONY: start

stop:
	$(DOCKER_COMPOSE) down
.PHONY: stop

restart:
	make stop && make start
.PHONY: restart

build:
	$(DOCKER_COMPOSE) build --no-cache
.PHONY: build

migrate:
	$(DOCKER) exec -it mest-bo-backend /bin/sh -c "npm run migration:run"