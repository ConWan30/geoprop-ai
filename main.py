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

    # Get port from environment, Railway provides this automatically
    port = int(os.getenv("PORT", 8000))

    print("="*50)
    print("🚀 GEOPROP AI STARTING UP")
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