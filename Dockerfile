FROM python:3.11-alpine
WORKDIR /fastapi_backend

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app
# COPY auth ./auth
COPY core ./core
COPY DB ./DB
COPY main.py .

CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port $PORT"]

