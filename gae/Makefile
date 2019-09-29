.PHONY: database backend frontend db-viewer

SHELL=bash
include .env

database:
	gcloud beta emulators datastore start \
		--no-store-on-disk \
		--host-port=$(DEV_DATABASE_HOST)

backend:
	cd backend && \
		BACKEND_HOST=$(DEV_BACKEND_HOST) \
		DATABASE_HOST=$(DEV_DATABASE_HOST) \
		DEV_BACKEND_API_KEY=$(DEV_BACKEND_API_KEY) \
		npm start

frontend:
	# NB: the HOST is hard coded.  It's just here for documentation purposes
	# NB: REACT_APP_BACKEND_HOST must start with REACT_APP_* to be transferred through react-static
	cd frontend && \
		REACT_APP_BACKEND_HOST=$(DEV_BACKEND_HOST) \
		HOST=$(DEV_FRONTEND_HOST) \
		npm start

test-backend:
	cd backend && \
		BACKEND_HOST=$(DEV_BACKEND_HOST) \
		DATABASE_HOST=$(DEV_DATABASE_HOST) \
		DEV_BACKEND_API_KEY=$(DEV_BACKEND_API_KEY) \
		npm run test

db-viewer:
	cd db-viewer && \
		$(gcloud beta emulators datastore env-init) \
		npx dsui -p $(DB_VIEWER_PORT) \
			-r default \
			-e $(DEV_DATABASE_HOST)

test-datastore:
	cd backend && \
		DATABASE_HOST=$(DEV_DATABASE_HOST) \
		npx jest src/datastore.int.test.js
