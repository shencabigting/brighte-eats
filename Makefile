# Start the services defined in docker-compose.yml
up:
	docker-compose --env-file .env up -d

down:
	docker-compose down