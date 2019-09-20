SHELL=bash

SHELL=bash
include .env

database:
	gcloud beta emulators datastore start --no-store-on-disk --host-port=$(DEV_DATABASE_HOST)

backend: force
	cd backend && BACKEND_HOST=$(DEV_BACKEND_HOST) DATABASE_HOST=$(DEV_DATABASE_HOST) npm start

frontend: force
	# NB: the HOST is hard coded.  It's just here for documentation purposes
	cd frontend && REACT_APP_BACKEND_HOST=$(DEV_BACKEND_HOST) HOST=$(DEV_FRONTEND_HOST) npm start

force:
