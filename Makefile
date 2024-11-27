# Start the services defined in docker-compose.yml
up:
	docker-compose --env-file .env up --build -d

down:
	docker-compose down
