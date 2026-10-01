# Cloud Run deployment

This project deploys to Google Cloud Run from GitHub Actions after successful builds on `main`.

The workflow lives at:

```text
.github/workflows/deploy-cloud-run.yml
```

It runs the frontend checks/build, then deploys with:

```bash
gcloud run deploy homepage \
  --source . \
  --region us-east1 \
  --project jamallin \
  --allow-unauthenticated
```

## One-time setup

These steps configure GitHub Actions to authenticate to Google Cloud through Workload Identity Federation. Secrets are stored in GitHub repository settings, not in git.

Assumptions:

```bash
PROJECT_ID=jamallin
REPO=Noswad123/jamallin
REGION=us-east1
SERVICE=homepage
```

## 1. Log in locally

```bash
gcloud auth login
gcloud config set project jamallin
gh auth login
```

## 2. Enable required Google Cloud APIs

```bash
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  iamcredentials.googleapis.com \
  sts.googleapis.com
```

## 3. Create the deploy service account

```bash
gcloud iam service-accounts create github-actions-deployer \
  --display-name="GitHub Actions Cloud Run Deployer"
```

Set helper variables:

```bash
PROJECT_ID=jamallin
PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format="value(projectNumber)")
SA_EMAIL="github-actions-deployer@$PROJECT_ID.iam.gserviceaccount.com"
REPO="Noswad123/jamallin"
```

## 4. Grant deploy permissions

```bash
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/cloudbuild.builds.editor"

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/artifactregistry.writer"
```

Allow the deploy service account to act as the default Cloud Run runtime service account:

```bash
RUNTIME_SA="$PROJECT_NUMBER-compute@developer.gserviceaccount.com"

gcloud iam service-accounts add-iam-policy-binding "$RUNTIME_SA" \
  --project="$PROJECT_ID" \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/iam.serviceAccountUser"
```

## 5. Create the Workload Identity pool and provider

```bash
gcloud iam workload-identity-pools create github-actions \
  --project="$PROJECT_ID" \
  --location="global" \
  --display-name="GitHub Actions"
```

```bash
gcloud iam workload-identity-pools providers create-oidc github \
  --project="$PROJECT_ID" \
  --location="global" \
  --workload-identity-pool="github-actions" \
  --display-name="GitHub" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.ref=assertion.ref" \
  --attribute-condition="assertion.repository == '$REPO'"
```

## 6. Allow this GitHub repo to impersonate the deploy service account

```bash
gcloud iam service-accounts add-iam-policy-binding "$SA_EMAIL" \
  --project="$PROJECT_ID" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github-actions/attribute.repository/$REPO"
```

## 7. Add GitHub repository secrets

```bash
GCP_WORKLOAD_IDENTITY_PROVIDER="projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github-actions/providers/github"

gh secret set GCP_WORKLOAD_IDENTITY_PROVIDER --body "$GCP_WORKLOAD_IDENTITY_PROVIDER"
gh secret set GCP_SERVICE_ACCOUNT --body "$SA_EMAIL"
```

The workflow reads these as:

```yaml
${{ secrets.GCP_WORKLOAD_IDENTITY_PROVIDER }}
${{ secrets.GCP_SERVICE_ACCOUNT }}
```

## 8. Deploy

Commit and push the workflow to `main`:

```bash
git add .github/workflows/deploy-cloud-run.yml docs/deploy.md README.md
git commit -m "Add Cloud Run deployment workflow"
git push origin main
```

GitHub Actions should run automatically. If checks and build pass, the `deploy` job will deploy `homepage` to Cloud Run.

## Manual deployment

You can still deploy locally with:

```bash
make deploy
```
