#!/bin/sh

python manage.py makemigrations 
python manag.py migrate --no-input
python manag.py collectstatic --no-input

gunicorn project.wsgi:application --bind 0.0.0.0:8000 