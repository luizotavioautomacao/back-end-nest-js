include .env

.PHONY: up
up:
	docker-compose up #-d

.PHONY: down
down:
	docker-compose down

.PHONY: server
server:
	docker-compose logs -f server

.PHONY: mongo
mongo:
	docker-compose logs -f mongo

.PHONY: minio
minio:
	docker-compose logs -f minio