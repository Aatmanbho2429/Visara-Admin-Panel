from pydantic import BaseModel
from typing import Optional

class UserAddRequest(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    device_id: str
    company_name: str
    password: str