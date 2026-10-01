# My Personal website

![Cowboy programmer](static/assets/cowboy-programmer.jpg)

## Deployment

Pushes to `main` run the GitHub Actions workflow in `.github/workflows/deploy-cloud-run.yml`.
The workflow checks and builds the Svelte frontend, then deploys the repo to Cloud Run with:

```bash
gcloud run deploy homepage --source . --region us-east1 --project jamallin --allow-unauthenticated
```

Required GitHub repository secrets:

- `GCP_WORKLOAD_IDENTITY_PROVIDER`
- `GCP_SERVICE_ACCOUNT`
