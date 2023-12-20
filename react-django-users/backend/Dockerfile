# Base image
FROM python:3.11-slim AS base

ARG BACKEND_PORT=8000
ENV BACKEND_PORT=$BACKEND_PORT

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt --no-cache-dir --disable-pip-version-check

COPY . .
RUN ["chmod", "+x", "./docker-entrypoint.sh"]

# Development image
FROM base as dev
WORKDIR /app
EXPOSE $BACKEND_PORT
CMD ["sh", "-c", "python manage.py runserver 0.0.0.0:$BACKEND_PORT"]

# Production image
FROM base AS prod
WORKDIR /app
EXPOSE $BACKEND_PORT
ENTRYPOINT [ "bash", "-c", "./docker-entrypoint.sh", "docker-entrypoint.sh" ]