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
        
    def GetUserList(self,data:dict):
        try:
            r = requests.post(
                f"{SUPABASE_EDGE}/get-user-list",
                json={
                    "page_no":              data.get("page_no", 1),
                    "page_size":            data.get("page_size", 25),
                    "sorting_column_name":  data.get("sorting_column_name", ""),
                    "sorting_type":         data.get("sorting_type", "ASC"),
                    "search_text":          data.get("search_text", ""),
                },
                timeout=15
            )
            return r.json()
    
        except requests.exceptions.ConnectionError:
            return {"success": False, "message": "No internet connection."}
        except Exception as e:
            return {"success": False, "message": str(e)}
        
    def DeleteUser(self,user_id:str):
        print(f"Request to delete user with id: {user_id}")
        try:
            r = requests.post(
                f"{SUPABASE_EDGE}/delete-user",
                json={"user_id": user_id},
                timeout=15
            )
            return r.json()

        except requests.exceptions.ConnectionError:
            return {"success": False, "message": "No internet connection."}
        except Exception as e:
            return {"success": False, "message": str(e)}
        
    def GetUserById(self,user_id:str)-> dict:
        try:
            r = requests.post(
                f"{SUPABASE_EDGE}/get-user-by-id",
                json={"user_id": user_id},
                timeout=15
            )
            return r.json()
        except requests.exceptions.ConnectionError:
            return {"success": False, "message": "No internet connection."}
        except Exception as e:
            return {"success": False, "message": str(e)}
        
    def EditUser(self,data:dict):
        print(f"Request to edit user with data: {data}")