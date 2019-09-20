SHELL=bash

SHELL=bash
include .env

database:
	gcloud beta emulators datastore start --no-store-on-disk --host-port=$(DEV_DATABASE_HOST)

backend: force
	cd backend && BACKEND_HOST=$(DEV_BACKEND_HOST) DATABASE_HOST=$(DEV_DATABASE_HOST) npm start

frontend: force
	cd frontend && PORT=3000 npm start  # NB: the PORT is a hard coded default

force:
