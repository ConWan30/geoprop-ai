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
    print(f"Starting GeoProp AI on port {port}")

    uvicorn.run(app, host="0.0.0.0", port=port)