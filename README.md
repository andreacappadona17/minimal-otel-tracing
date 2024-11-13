# Distributed Tracing with Fastify, OpenTelemetry, Tempo, and Grafana

This project demonstrates distributed tracing across two Fastify applications (`frontend` and `backend`), utilizing OpenTelemetry for tracing, Tempo as a trace backend, and Grafana for trace visualization. The `frontend` service sends requests to the `backend` service, which handles random number generation and stores the numbers in a PostgreSQL database.

## Features

- **Distributed Tracing**: Using OpenTelemetry with W3C Trace Context Propagator.
- **Tempo Backend**: Stores traces for distributed systems.
- **Grafana**: Visualize and explore traces using Tempo as a data source.
- **PostgreSQL**: Backend stores random numbers in a database.
- **Docker & Docker Compose**: Easily spin up the entire stack locally.
- **Automated Testing**: A script to send and fetch random numbers to test the system.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)
- **jq**: A command-line JSON processor (for viewing trace results). Install it via `brew install jq` (macOS) or `apt-get install jq` (Ubuntu).

## Setup and Running Locally

```bash
make up
```

This will build and run the following services:

- Frontend (HTTP): http://localhost:3001
- Backend (HTTP): http://localhost:3002
- Grafana: http://localhost:3000 | Username: admin Password: admin

## Visualize Traces in Grafana
After navigating to Grafana, log in with the credentials (admin / admin), and go to Explore.
Select Tempo as the data source.
You should be able to see the distributed traces from the frontend and backend.

## Run the test script
To test the system by sending 100 random numbers to the write endpoint and retrieving them from the read endpoint, use the provided `test.sh` script.

Run the script as follows:

```bash
./test.sh
```

This will:

Send 100 requests to the write endpoint (triggering random number generation).
Fetch the latest 100 numbers from the read endpoint and display them.


## Stopping the Services
To stop all the services, use:

```bash
make down
```

