import http.server
import socketserver
import os

PORT = 8080

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
    '.wasm': 'application/wasm',
    '.js': 'application/javascript',
    '.svg': 'image/svg+xml'
})

dist_dir = os.path.join(os.path.dirname(__file__), 'dist')
os.chdir(dist_dir)

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.allow_reuse_address = True
    print("serving at port", PORT)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        raise SystemExit(0)
