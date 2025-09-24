#!/usr/bin/env python3
import os
import sys
import json
from http.server import HTTPServer, BaseHTTPRequestHandler

class MinimalHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()

        info = {
            "message": "🚨 Railway Minimal Debug - Working!",
            "status": "minimal_success",
            "port": os.getenv("PORT", "not_set"),
            "railway_port": os.getenv("RAILWAY_PORT", "not_set"),
            "pwd": os.getcwd(),
            "python": sys.version.split()[0],
            "files": os.listdir(".") if os.path.exists(".") else "no_access",
            "env_vars": [k for k in os.environ.keys() if "PORT" in k or "RAILWAY" in k]
        }

        self.wfile.write(json.dumps(info, indent=2).encode())

    def log_message(self, format, *args):
        pass

if __name__ == "__main__":
    port = int(os.getenv("PORT", os.getenv("RAILWAY_PORT", "8080")))
    print(f"🚨 MINIMAL DEBUG: Starting on port {port}")
    try:
        HTTPServer(('0.0.0.0', port), MinimalHandler).serve_forever()
    except Exception as e:
        print(f"ERROR: {e}")
        sys.exit(1)