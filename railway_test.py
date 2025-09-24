#!/usr/bin/env python3
"""
Simple Railway test server to verify deployment is working
"""

import os
import json
from http.server import HTTPServer, BaseHTTPRequestHandler


class TestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path == '/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            response = {
                "message": "🚀 GeoProp AI Railway Test - SUCCESS!",
                "status": "healthy",
                "port": os.getenv("PORT", "8000"),
                "environment": os.getenv("RAILWAY_ENVIRONMENT", "development"),
                "service": os.getenv("RAILWAY_SERVICE_NAME", "geoprop-ai"),
                "railway_deployment": True
            }

            self.wfile.write(json.dumps(response, indent=2).encode())
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not Found")

    def log_message(self, format, *args):
        print(f"Railway Request: {format % args}")


if __name__ == "__main__":
    # Railway might use different PORT env var
    port = int(os.getenv("PORT", os.getenv("RAILWAY_PORT", "8080")))

    print("="*50)
    print("🧪 RAILWAY TEST SERVER - DEBUG MODE")
    print("="*50)
    print(f"PORT env var: {os.getenv('PORT', 'NOT SET')}")
    print(f"RAILWAY_PORT env var: {os.getenv('RAILWAY_PORT', 'NOT SET')}")
    print(f"Using port: {port}")
    print(f"Binding to: 0.0.0.0:{port}")
    print("="*50)

    try:
        server = HTTPServer(('0.0.0.0', port), TestHandler)
        print(f"✅ Server started successfully on port {port}")
        print(f"🌐 Railway should route traffic from 8080 to {port}")
        server.serve_forever()
    except Exception as e:
        print(f"❌ Server failed to start: {e}")
        import traceback
        traceback.print_exc()