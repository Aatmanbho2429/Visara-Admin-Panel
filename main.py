import webview
import platform
from app.api import router, set_window
import sys
sys.dont_write_bytecode = True
import threading
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:4201"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

def run_server():
    uvicorn.run(app, host="127.0.0.1", port=8000)

# Start FastAPI in the background
server_thread = threading.Thread(target=run_server, daemon=True)
server_thread.start()

# api      = Api()
SYSTEM   = platform.system()

UI_PATH = "http://localhost:4201/"
SPLASH_HTML = """
<!DOCTYPE html>
<html>
<head>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #0f0f0f;
            font-family: sans-serif;
            color: white;
        }
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #333;
            border-top-color: #fff;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        p { margin-top: 16px; font-size: 14px; color: #888; }
        .container { text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
        <p>Loading Visara...</p>
    </div>
</body>
</html>
"""


window = webview.create_window(
    "Visara",
    html=SPLASH_HTML
)

set_window(window)

def on_loaded():
    window.load_url(UI_PATH)

webview.start(
        http_server=True,
        private_mode=False,
        debug=True,
        func=on_loaded
    )