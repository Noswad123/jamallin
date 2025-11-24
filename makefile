requirements:
	uv sync

frontend:
	cd frontend && npm install && npm run build

deploy: requirements
	gcloud run deploy homepage \
		--source . \
		--region us-east1 \
		--project jamallin \
		--allow-unauthenticated
