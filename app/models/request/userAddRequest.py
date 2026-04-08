from pydantic import BaseModel

class UserAddRequest(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    device_id: str
    password: str
    company_name: str
    status:bool