# Base stage
FROM python:3.11-slim-bullseye AS base
WORKDIR /fastapi-server

COPY requirements.txt .
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
      libgomp1 \
      build-essential \
  && rm -rf /var/lib/apt/lists/* \
  && pip install --no-cache-dir -r requirements.txt

COPY . .

# Development stage
FROM base AS dev

CMD ["python3",  "main.py"]

# Production stage
FROM base AS prod
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]



