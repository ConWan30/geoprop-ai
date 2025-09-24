#!/bin/bash
# GeoProp AI Railway Startup Script

echo "Starting GeoProp AI on Railway..."
echo "Environment: $RAILWAY_ENVIRONMENT"
echo "Port: $PORT"

# Change to backend directory
cd backend

# Start the application
uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}