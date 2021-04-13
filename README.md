## BugTracker

This is a bug tracker app I built for myself while developing another project to keep my work organized. It runs on a React frontend and a Django REST API backend with a sqlite database(can be easily changed). 

Install dependencies with 

```bash
poetry install
```

Afterwards change into the backend directory

```bash
cd bugtracker
```

And then start the server

```bash
python manage.py runserver
```

You can migrate with

```bash
python manage.py makemigrations
python manage.py migrate
```

For the frontend, from the root directory of the project change into the frontend directory

```bash
cd frontend
```

Then start the react app.

```bash
npm start
```

