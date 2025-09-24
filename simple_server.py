#!/usr/bin/env python3
"""
Ultra-simple Railway server for debugging
"""

import os
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
import sys

class SimpleHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        response = {
            "success": True,
            "message": "🎉 GeoProp AI Railway Server Working!",
            "port_used": os.getenv("PORT", "unknown"),
            "all_env": {k: v for k, v in os.environ.items() if "PORT" in k or "RAILWAY" in k}
        }

        self.wfile.write(json.dumps(response, indent=2).encode())
        print(f"✅ Request served: {self.path}")

    def log_message(self, format, *args):
        pass  # Suppress default logging

if __name__ == "__main__":
    # Try multiple port sources
    port = None

    for port_var in ["PORT", "RAILWAY_PORT"]:
        if os.getenv(port_var):
            port = int(os.getenv(port_var))
            print(f"🔍 Using port from {port_var}: {port}")
            break

    if port is None:
        port = 8080  # Railway default
        print(f"🔍 No PORT env var found, using default: {port}")

    print(f"🚀 Starting server on 0.0.0.0:{port}")

    try:
        httpd = HTTPServer(('0.0.0.0', port), SimpleHandler)
        print(f"✅ Server listening on port {port}")
        httpd.serve_forever()
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)