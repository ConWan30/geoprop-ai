#!/bin/bash
echo "Starting GeoProp AI..."
echo "PORT: ${PORT:-8000}"

# Use Python to handle port parsing instead of shell variable
python -c "
import os
import uvicorn
from app.main import app

port = int(os.getenv('PORT', 8000))
print(f'Starting on port {port}')
uvicorn.run(app, host='0.0.0.0', port=port)
"