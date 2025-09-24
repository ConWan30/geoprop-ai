#!/usr/bin/env python3
"""
Railway Deployment Debug Script
This script will help identify exactly what's wrong with the Railway deployment
"""

import os
import sys
import traceback
import json
import importlib.util
from http.server import HTTPServer, BaseHTTPRequestHandler

# Collect all environment information
debug_info = {
    "python_version": sys.version,
    "python_path": sys.path,
    "current_directory": os.getcwd(),
    "environment_variables": {
        k: v for k, v in os.environ.items()
        if any(keyword in k.upper() for keyword in ['PORT', 'RAILWAY', 'DATABASE', 'PYTHON'])
    },
    "files_in_directory": [],
    "import_tests": {},
    "startup_errors": []
}

# Check what files exist
try:
    debug_info["files_in_directory"] = os.listdir(".")
    if os.path.exists("backend"):
        debug_info["backend_files"] = os.listdir("backend")
    if os.path.exists("backend/app"):
        debug_info["backend_app_files"] = os.listdir("backend/app")
except Exception as e:
    debug_info["startup_errors"].append(f"File listing error: {e}")

# Test critical imports
imports_to_test = [
    "fastapi",
    "uvicorn",
    "pydantic",
    "sys",
    "os",
    "json"
]

for module_name in imports_to_test:
    try:
        module = importlib.import_module(module_name)
        debug_info["import_tests"][module_name] = "✅ SUCCESS"
    except ImportError as e:
        debug_info["import_tests"][module_name] = f"❌ FAILED: {e}"

# Test FastAPI app import
try:
    sys.path.insert(0, os.path.join(os.getcwd(), 'backend'))
    from backend.app.main import app
    debug_info["fastapi_app_import"] = "✅ FastAPI app imported successfully"
except Exception as e:
    debug_info["fastapi_app_import"] = f"❌ FastAPI import failed: {e}"
    debug_info["startup_errors"].append(f"FastAPI import error: {traceback.format_exc()}")

# Port detection
port = None
port_source = "unknown"

for port_var in ["PORT", "RAILWAY_PORT"]:
    if os.getenv(port_var):
        try:
            port = int(os.getenv(port_var))
            port_source = port_var
            break
        except ValueError as e:
            debug_info["startup_errors"].append(f"Port conversion error for {port_var}: {e}")

if port is None:
    port = 8080
    port_source = "default"

debug_info["port_detection"] = {
    "port": port,
    "source": port_source,
    "PORT_env": os.getenv("PORT"),
    "RAILWAY_PORT_env": os.getenv("RAILWAY_PORT")
}

class DebugHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        response = {
            "message": "🔍 GeoProp AI Railway Debug Information",
            "status": "debug_mode",
            "debug_info": debug_info,
            "timestamp": str(__import__("datetime").datetime.now())
        }

        self.wfile.write(json.dumps(response, indent=2).encode())

    def log_message(self, format, *args):
        print(f"[DEBUG REQUEST] {format % args}")

if __name__ == "__main__":
    try:
        print("="*60)
        print("🔍 GEOPROP AI RAILWAY DEBUG MODE")
        print("="*60)
        print(f"Port: {port} (from {port_source})")
        print(f"Python: {sys.version}")
        print(f"Directory: {os.getcwd()}")
        print(f"Files: {debug_info['files_in_directory']}")
        print("="*60)

        # Try to start the server
        server = HTTPServer(('0.0.0.0', port), DebugHandler)
        print(f"✅ Debug server started successfully on port {port}")
        print(f"🌐 Visit the Railway URL to see debug information")
        print("="*60)

        server.serve_forever()

    except Exception as e:
        print(f"❌ Debug server failed to start: {e}")
        print(f"❌ Traceback: {traceback.format_exc()}")

        # Try to write debug info to a file
        try:
            with open("debug_output.json", "w") as f:
                json.dump({
                    "debug_info": debug_info,
                    "server_error": str(e),
                    "traceback": traceback.format_exc()
                }, f, indent=2)
            print("✅ Debug info written to debug_output.json")
        except Exception as write_error:
            print(f"❌ Could not write debug file: {write_error}")

        sys.exit(1)