#!/usr/bin/env python3
"""
Ultra-simple Railway test - just verify files exist
"""
import os
import sys

print("="*50)
print("🧪 RAILWAY FILE TEST")
print("="*50)
print(f"Working directory: {os.getcwd()}")
print(f"Python version: {sys.version}")

try:
    files = os.listdir(".")
    print(f"Files in current directory: {files}")

    if "minimal_debug.py" in files:
        print("✅ minimal_debug.py found!")
        exec(open("minimal_debug.py").read())
    else:
        print("❌ minimal_debug.py NOT found")
        print("Available files:", files)

        # Create a simple HTTP server anyway
        from http.server import HTTPServer, BaseHTTPRequestHandler
        import json

        class TestHandler(BaseHTTPRequestHandler):
            def do_GET(self):
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                response = {
                    "message": "🚨 Railway Files Missing!",
                    "working_dir": os.getcwd(),
                    "files": files,
                    "missing": "minimal_debug.py"
                }
                self.wfile.write(json.dumps(response, indent=2).encode())

            def log_message(self, format, *args):
                pass

        port = int(os.getenv("PORT", "8080"))
        print(f"Starting emergency server on port {port}")
        HTTPServer(('0.0.0.0', port), TestHandler).serve_forever()

except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)