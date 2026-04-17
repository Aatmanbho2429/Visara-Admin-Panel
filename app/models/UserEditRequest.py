from datetime import date
from pydantic import BaseModel
from typing import Optional

class UserEditRequest(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str
    phone: str
    company_name: str
    status: bool
    device_id: str
    subscription_status: str
    subscription_end: date