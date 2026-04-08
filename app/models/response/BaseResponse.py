from pydantic import BaseModel
from typing import Generic, TypeVar
T = TypeVar("T")

class BaseResponse(BaseModel,Generic[T]):
    data: T
    message: str | None = None
    token: str | None = None
    status:bool