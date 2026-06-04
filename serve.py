import os, sys
os.chdir(os.path.join(os.path.dirname(__file__), 'warhammer-app'))
port = int(os.environ.get('PORT', 8765))
import http.server, socketserver
handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", port), handler) as httpd:
    print(f"Serving on port {port}")
    httpd.serve_forever()
