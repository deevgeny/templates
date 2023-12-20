# React Django Users
Базовое веб приложение с регистрацией и авторизацией.

## Содержание
* [Описание проекта](#описание-проекта 'Описание проекта')
* [Статус проекта](#статус-проекта 'Статус проекта')
* [Стек технологий](#стек-технологий 'Стек технологий')
* [Установка зависимостей](#установка-зависимостей 'Установка зависимостей')
* [Запуск проекта](#запуск-проекта 'Запуск проекта')

## Описание проекта
*Этот раздел пока пустой...*


## Статус проекта
*Этот раздел пока пустой...*

## Стек технологий
Фронтэнд:
* TypeScript 4.9.5
* React 18.2.0
* React Router 6.20.0
* React Hook Form 7.48.2
* Material UI 5.14.19

Бэкэнд:
* Python 3.10.12
* Django 4.2.7
* Django Rest Framework 3.14.0
* Djano Filter 23.3
* Simple JWT 5.3.0
* PostgreSQL 15

Инфраструктура:
* Docker compose 3.8
* Nginx 1.25.2


## Установка зависимостей
Перед запуском проекта необходимо установить зависимости и настроить 
конфигурационные файлы.

### Бэкэнд
Команды для подготовки среды разработки и установки зависимостей:
```sh
# Перейти в каталог backend
cd backend

# Установить виртуальную среду разработки
python3 -m venv venv

# Активировать виртуальную среду разработки
source venv/bin/activate

# Установить зависимости
pip install -r requirements.txt
```

### Фронтэнд
В каталоге фронтэнда необходимо создать .`env-файл` с переменными:
```bash
# fronend/.env
REACT_APP_API_URL=http://127.0.0.1:8000
REACT_APP_API_PREFIX=/api
REACT_APP_API_VERSION=/v1
```

Выполнить команды по установке зависимостей:
```bash
# Перейти в каталог frontend
cd frontend

# Установить зависимости
npm install --include=dev
```

### Инфраструктура docker
В каталоге docker необходимо создать файл с переменными необходимыми для 
запуска и работы приложений в контейнерах:
```bash
# docker/.env.development

# Only for local host development
# Database runtime variables
POSTGRES_USER=<username>
POSTGRES_DB=<database-name> # Should be same as username
POSTGRES_PASSWORD=<your-password>
# Backend runtime variables
DB_ENGINE=django.db.backends.postgresql
DB_NAME=<database-name> # Should be same as POSTGRES_DB
DB_HOST=database
DB_PORT=5432
DEBUG=1
SECRET_KEY=<django-secret>
ALLOWED_HOSTS='127.0.0.1 backend frontend' # Add server ip or domain here when deployed
CSRF_TRUSTED_ORIGINS='http://127.0.0.1:8000 http://127.0.0.1:3000' # your domain name required when using https
CORS_ALLOWED_ORIGINS='http://127.0.0.1:8000 http://127.0.0.1:3000'
# Admin user credentials to create first admin user on container start
ADMIN_EMAIL=<admin-email>
ADMIN_FIRST_NAME=<admin-first-name>
ADMIN_LAST_NAME=<admin-last-name>
ADMIN_PASSWORD=<admin-password
# Frontend variables for docker image build stage
API_URL='http://127.0.0.1:8000'
API_PREFIX=/api
API_VERSION=/v1
```

## Запуск проекта
Запустить проект на локальном хосте можно двумя способами: с помощью инструмента 
**docker compose** (предварительно он должен быть установлен и настроен) или через 
командную строку.

### Запуск через командную строку
При запуске проекта через командную строку, бэкэнд будет использовать базу 
данных **SQLite**.

Для запуска бэкэнда, откройте окно терминала и выполните следующие команды:
```bash
# Перейти в каталог backend
cd backend

# Активировать виртуальную среду разработки
source venv/bin/activate

# Запустить сервер разработки
python3 manage.py runserver
```

Для запуска фронтэнда в отдельном окне терминала выполните команду запуска:
```bash
# Перейти в каталог frontend
cd frontend

# Запустить сервер разработки
npm start
```

### Запуск с помощь docker compose
При запуске проекта с помощью docker compose бэкэнд будет использовать базу 
данных **PostgreSQL**.

В каталоге `docker` имеются несколько вариантов файлов запуска проекта:

* **Вариант для активной разработки - docker-compose.dev.yaml.**<br>
В данном варианте запуск происходит без обратного прокси сервера. Контейнер 
фронтенда получает внешние запросы напрямую через 3000 порт. У контейнера 
бэкэнда для внешних запросов открыт порт 8000. Каталоги репозитория с исходным 
кодом фронтэнда и бэкэнда прмонтированы к соответствующим контейнерам. В 
обоих контейнерах приложения запущены на серверах разработки.
Переменные окружения необходимые для работы приложения передаются в контейнера 
через `.env-файл`.

* **Вариант продакшен на локальном хосте - docker-compose.prod.yaml.**<br>
Здесь контейнер фронтэнда выступает в роли обратного прокси у которого 3000 
порт используется для внешних запросов. Фронтэнд и бэкэнд работают в продакшен 
режиме. Фронтенд собран и его раздает **nginx**, бэкэнд запущен на **Gunicorn**.
Переменные окружения необходимые для работы приложения передаются в контейнеры 
через `.env-файл`. Конфигурация **nginx** находится в файле `nginx.conf`.

* **Вариант сервер без шифрования через 80 порт - docker-compose.server.yaml.**<br>
Тоже самое что и предыдущий вариант, но используется 80 порт для обработки 
запросов и переменные окружения необходимые для работы приложения передаются в 
контейнеры с  помощью переменных окружения хоста.

Команды для запуска:
```bash
# Перейти в каталог docker
cd docker

# Запустить проект
docker compose -f docker-compose.xxx.yaml up
```

## Участники проекта
Евгений Дериглазов - автор идеи и проекта.
