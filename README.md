# Jarvis

Jarvis is a web application using Node.js, TypeScript, PostgreSQL, and pgAdmin, orchestrated with Docker.

## Prerequisites

Make sure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)

## Installation

Clone the repository and install the dependencies:

```sh
git clone <REPOSITORY_URL>
cd jarvis
npm install
```

## Running the Application

To run the application with Docker, follow these steps:

1. Start the Docker containers:

```
docker-compose up -d
````

This command starts the following services:

```jarvis_app```: The Node.js application
```jarvis_postgres```: The PostgreSQL database
```jarvis_pgadmin```: The pgAdmin interface

## Accessing the Application

* The application will be accessible at: http://localhost:5001

* pgAdmin will be accessible at: http://localhost:5050