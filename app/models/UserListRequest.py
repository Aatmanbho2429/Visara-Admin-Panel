from pydantic import BaseModel
from typing import Optional

class UserListRequest(BaseModel):
    page_no: int = 1
    page_size: int = 10
    sorting_column_name: Optional[str] = ""
    sorting_type: Optional[str] = "ASC"
    search_text: Optional[str] = ""