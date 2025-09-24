#!/usr/bin/env python3
"""
GeoProp AI - Root Entry Point for Railway
"""

import sys
import os

# Add backend to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

# Import the FastAPI app
from backend.app.main import app

if __name__ == "__main__":
    import uvicorn

    # Railway port detection - same logic as simple_server.py
    port = None
    for port_var in ["PORT", "RAILWAY_PORT"]:
        if os.getenv(port_var):
            port = int(os.getenv(port_var))
            print(f"🔍 Using port from {port_var}: {port}")
            break

    if port is None:
        port = 8080  # Railway default
        print(f"🔍 No PORT env var found, using Railway default: {port}")

    print("="*50)
    print("🚀 GEOPROP AI - FULL PLATFORM STARTING")
    print("="*50)
    print(f"Port: {port}")
    print(f"Environment: {os.getenv('RAILWAY_ENVIRONMENT', 'development')}")
    print(f"Service: {os.getenv('RAILWAY_SERVICE_NAME', 'geoprop-ai')}")
    print("="*50)

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        log_level="info",
        access_log=True
    )