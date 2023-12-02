FROM python:3.10-slim

# RUN mkdir -p /usr/src/api
# WORKDIR /usr/src/api

# RUN apt-get update \
#   && apt-get -y install netcat gcc postgresql libpq-dev libcairo2 libpango1.0-0 python3-numpy python3-pandas\
#   && apt-get clean

RUN pip install --upgrade pip

COPY ./requirements.txt .

RUN pip install -r requirements.txt
    
COPY . /app
WORKDIR /app

# LABEL maintainer="Trisoft <code@trisoft.co.in>"

# EXPOSE 8000

COPY ./entrypoint.sh .

ENTRYPOINT [ "sh","/app/entrypoint.sh" ]
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


