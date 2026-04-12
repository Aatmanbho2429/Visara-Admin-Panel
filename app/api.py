import json
import os
import platform
import subprocess
import requests
import webview
from app.config import SUPABASE_EDGE
# ── pywebview window reference — set from main.py after window is created ──
_window = None

def set_window(win):
    global _window
    _window = win


class Api:

    # ── selectFile ─────────────────────────────────────────────────────────
    def PrintHello(self):
        return 'hello from python'
        print('hello')

    def AddUser(self,data:dict):
        """
        Calls the Supabase create-user edge function.
        Expects dict with: first_name, last_name, email, password,
                        phone (optional), company_name (optional), device_id (optional)
        """
        try:
            r = requests.post(
                f"{SUPABASE_EDGE}/create-user",
                json={
                    "first_name":   data.get("first_name", ""),
                    "last_name":    data.get("last_name", ""),
                    "email":        data.get("email", ""),
                    "password":     data.get("password", ""),
                    "phone":        data.get("phone", None),
                    "company_name": data.get("company_name", None),
                    "device_id":    data.get("device_id", None),
                },
                timeout=15
            )
            return r.json()
    
        except requests.exceptions.ConnectionError:
            return {"success": False, "message": "No internet connection. Please check your network."}
        except Exception as e:
            return {"success": False, "message": f"Error creating user: {str(e)}"}