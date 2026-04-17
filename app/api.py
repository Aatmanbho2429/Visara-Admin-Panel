import requests
from app.config import SUPABASE_EDGE
from fastapi import APIRouter
from fastapi import Depends
from app.models.UserListRequest import UserListRequest
from app.models.UserAddRequest import UserAddRequest

def set_window(win):
    global _window
    _window = win
    
_window = None

router = APIRouter()


@router.get('/hello')
def PrintHello():
    return 'hello from python'
    print('hello')
    
@router.post('/user/add')
def AddUser(data: UserAddRequest):
    try:
        r = requests.post(
            f"{SUPABASE_EDGE}/create-user",
            # json={
            #     "first_name":   data.get("first_name", ""),
            #     "last_name":    data.get("last_name", ""),
            #     "email":        data.get("email", ""),
            #     "password":     data.get("password", ""),
            #     "phone":        data.get("phone", None),
            #     "company_name": data.get("company_name", None),
            #     "device_id":    data.get("device_id", None),
            # },
            json=data.dict(),
            timeout=15
        )
        return r.json()
    
    except requests.exceptions.ConnectionError:
        return {"success": False, "message": "No internet connection. Please check your network."}
    except Exception as e:
        return {"success": False, "message": f"Error creating user: {str(e)}"}
        
@router.post('/user/list')    
def GetUserList(data: UserListRequest):
    try:
        r = requests.post(
            f"{SUPABASE_EDGE}/get-user-list",
            # json={
            #     "page_no":              data.get("page_no", 1),
            #     "page_size":            data.get("page_size", 25),
            #     "sorting_column_name":  data.get("sorting_column_name", ""),
            #     "sorting_type":         data.get("sorting_type", "ASC"),
            #     "search_text":          data.get("search_text", ""),
            # },
            json=data.dict(),
            timeout=15
        )
        return r.json()

    except requests.exceptions.ConnectionError:
        return {"success": False, "message": "No internet connection."}
    except Exception as e:
        return {"success": False, "message": str(e)}
    
@router.delete('/user/{user_id}')    
def DeleteUser(user_id:str):
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
    
@router.get('/user/{user_id}')    
def GetUserById(user_id:str)-> dict:
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
    
@router.put('user/edit')    
def EditUser(self,data:dict):
    try:
        r = requests.post(
            f"{SUPABASE_EDGE}/edit-user",
            json=data,
            timeout=15
        )
        return r.json()
    except requests.exceptions.ConnectionError:
        return {"success": False, "message": "No internet connection."}
    except Exception as e:
        return {"success": False, "message": str(e)}
