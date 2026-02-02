# Docker Project Structure

## Overview
This project contains Docker configurations for a Python Flask application with PostgreSQL database.

## Directory Structure
```
docker/
├── docker-compose.yml          # Main Docker Compose configuration
├── python-app/                 # Python Flask application
│   ├── Dockerfile              # Python app Dockerfile
│   ├── requirements.txt        # Python dependencies
│   └── app.py                  # Flask application (to be added)
└── postgres/                   # PostgreSQL database
    ├── Dockerfile              # PostgreSQL Dockerfile
    └── init.sql                # Database initialization script
```

## Usage
1. Build and start containers:
   ```bash
docker-compose up -d
   ```

2. Stop containers:
   ```bash
docker-compose down
   ```

3. View logs:
   ```bash
docker-compose logs -f
   ```