from pydantic import BaseModel

class UserListRequest(BaseModel):
    page_no: int = 1
    page_size: int = 10
    sorting_column_name: str = ''
    sorting_type: str = 'asc'
    search_text : str=''