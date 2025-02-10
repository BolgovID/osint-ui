# OsintUi

This is the frontend of the OSINT Web App, providing a ui to interact with the domain scanning system.

## Requirements
1. Node 18.13.0+
2. Docker (Optional)

## Features
1. Start, stop, and monitor domain scans
2. View scan history and details

## Installation

### 1. Clone the repository

Run the following command in your terminal:

```bash
git clone https://github.com/BolgovID/osint-ui.git
cd osint-ui
```

### 2. Install dependencies

To install dependencies, run:

```bash
npm install
```

### 3. Run

Start the development server:

```bash
ng serve --open
```

This will launch the app in your default web browser at http://localhost:4200.

## Docker

### 1.Build image

Run the following command:

```bash
docker build -t osint-ui .
```

### 2.Run docker container

```bash
docker run --rm -d osint-ui
```

## API

The application works with backend api which you can find at https://github.com/BolgovID/osint-scanner

If you deside to run dockerized applications (backend, frontend, postgres) - make sure that they works on the same docker network.
For example:

```bash
docker run --rm -d \
  --network osint-web-app_osint-network \
  osint-ui
```