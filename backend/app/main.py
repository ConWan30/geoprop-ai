"""
GeoProp AI - FastAPI Application for Railway Deployment
Production-ready esports prop betting platform
"""

import os
from contextlib import asynccontextmanager
from typing import Dict, Any

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
import structlog

# Configure structured logging
structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer()
    ],
    wrapper_class=structlog.stdlib.BoundLogger,
    logger_factory=structlog.stdlib.LoggerFactory(),
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown"""
    # Startup
    logger.info("GeoProp AI starting up...")

    # Log environment info
    port = os.getenv("PORT", "8000")
    env = os.getenv("RAILWAY_ENVIRONMENT", "development")

    logger.info(
        "Application started",
        port=port,
        environment=env,
        railway_service=os.getenv("RAILWAY_SERVICE_NAME", "geoprop-ai")
    )

    yield

    # Shutdown
    logger.info("GeoProp AI shutting down...")

# Initialize FastAPI app
app = FastAPI(
    title="GeoProp AI",
    description="AI-Powered Esports Prop Betting Platform",
    version="1.0.0",
    lifespan=lifespan
)

# Add middleware
app.add_middleware(GZipMiddleware, minimum_size=1000)

# CORS for Railway domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://*.railway.app",
        "https://geoprop.ai",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler"""
    logger.error(
        "Unhandled exception",
        path=request.url.path,
        method=request.method,
        error=str(exc)
    )

    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error"}
    )

# Health check endpoints
@app.get("/")
async def root():
    """Root endpoint for Railway health checks"""
    return {
        "service": "GeoProp AI",
        "status": "healthy",
        "environment": os.getenv("RAILWAY_ENVIRONMENT", "development"),
        "railway": True
    }

@app.get("/health")
async def health_check():
    """Comprehensive health check"""
    return {
        "status": "healthy",
        "service": "GeoProp AI",
        "version": "1.0.0",
        "environment": os.getenv("RAILWAY_ENVIRONMENT", "development"),
        "port": os.getenv("PORT", "8000")
    }

# API routes
@app.get("/api/v1/status")
async def api_status():
    """API status endpoint"""
    return {
        "api": "GeoProp AI v1",
        "status": "operational",
        "features": [
            "IoTeX blockchain integration",
            "AI-powered prop predictions",
            "Real-time betting",
            "Geolocation services"
        ]
    }

# Warzone integration placeholder
@app.get("/api/v1/games/warzone/status")
async def warzone_status():
    """Warzone game integration status"""
    return {
        "game": "Call of Duty: Warzone",
        "integration": "active",
        "supported_metrics": [
            "kills",
            "damage",
            "placement",
            "survival_time"
        ]
    }

# IoTeX blockchain placeholder
@app.get("/api/v1/blockchain/status")
async def blockchain_status():
    """IoTeX blockchain integration status"""
    return {
        "blockchain": "IoTeX",
        "network": "mainnet",
        "rpc_endpoint": os.getenv("IOTEX_RPC_URL", "https://babel-api.mainnet.iotex.io"),
        "status": "connected"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)