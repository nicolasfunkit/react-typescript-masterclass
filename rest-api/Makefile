DENO_VERSION=1.12.1

include .env

db_start:
	docker run -d --rm -p $(DB_PORT):5432 --name $(APP_NAME) -e POSTGRES_PASSWORD=$(DB_PASSWORD) -e POSTGRES_DB=$(DB_NAME) postgres:14

db_stop:
	docker kill $(APP_NAME)

build:
	docker build -t $(APP_NAME) --build-arg DENO_VERSION=$(DENO_VERSION) .

run_prod:
	docker run -it --rm -p $(APP_PORT):$(APP_PORT) $(APP_NAME)

task:
	deno task $(filter-out $@,$(MAKECMDGOALS))

%:
	@:
