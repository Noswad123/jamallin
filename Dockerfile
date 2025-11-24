FROM python:3.12-slim AS backend

WORKDIR /app

# Install Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY main.py .

# Copy any existing static assets (optional)
COPY static ./static

# Copy built Svelte frontend into static directory
COPY frontend/build ./static

# Cloud Run port
ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT}"]
