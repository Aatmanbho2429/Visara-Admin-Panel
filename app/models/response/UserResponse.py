# models/response.py
from pydantic import BaseModel
from datetime import date
from typing import Generic, TypeVar, List
from datetime import date
T = TypeVar("T")

class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    phone: str
    status: str                        # "Active" | "Inactive"
    device_id: str
    subscription_status: str           # "Subscribed" | "Expired"
    subscription_end_date: date

class ListResponse(BaseModel, Generic[T]):
    list: List[T]
    total_count: int