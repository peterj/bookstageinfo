#!/bin/sh

CONTAINER_NAME=backstage-postgres
PORT=5432
PASSWORD=mysecretpassword

POSTGRES_IMAGE=postgres:16.2


# Check if -r is provided and restart the container
if [ "$1" = "-r" ]; then
  echo "Restarting the database"
  docker restart $CONTAINER_NAME
  exit 0
fi

# Check if the container is already running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  echo "Database is already running"
  exit 0
fi

docker run --name $CONTAINER_NAME -p $PORT:$PORT -e POSTGRES_PASSWORD=$PASSWORD -d $POSTGRES_IMAGE

echo "Database started."
