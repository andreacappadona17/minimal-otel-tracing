# Variables
DOCKER_COMPOSE = docker-compose

# Default target
.PHONY: help
help:  ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Docker Compose
.PHONY: up
up:  ## Start all services using Docker Compose
	$(DOCKER_COMPOSE) up --build

.PHONY: down
down:  ## Stop and remove all services
	$(DOCKER_COMPOSE) down

.PHONY: logs
logs:  ## Show logs for all services
	$(DOCKER_COMPOSE) logs -f

.PHONY: restart
restart: down up  ## Restart all services

.PHONY: clean
clean:  ## Stop all services and remove volumes
	$(DOCKER_COMPOSE) down -v
