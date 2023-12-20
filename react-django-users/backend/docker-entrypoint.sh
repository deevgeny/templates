#!/bin/bash

if [ $CELERY ]; then
    if [ $DEBUG ]; then
        celery -A config worker -l DEBUG
        exit 0
    else
        celery -A config worker -l INFO
        exit 0
    fi
fi

python manage.py collectstatic --noinput

python manage.py migrate

python manage.py createadminuser

if [ $DEBUG ]; then
python manage.py runserver 0.0.0.0:$BACKEND_PORT $@
else
gunicorn core.wsgi:application -b 0.0.0.0:$BACKEND_PORT $@
fi