from typing_extensions import Annotated

from fastapi import APIRouter
from fastapi.params import Query
from app.models.request.userAddRequest import UserAddRequest
from app.models.request.userListRequest import UserListRequest
from app.models.response.UserResponse import ListResponse, UserResponse
from app.models.response.BaseResponse import BaseResponse
from datetime import date

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)

def generate_dummy_users(count: int = 100) -> list[UserResponse]:
    return [
        UserResponse(
            id=i + 1,
            first_name=f"User{i + 1}",
            last_name=f"Test{i + 1}",
            email=f"user{i + 1}@mail.com",
            phone="9999999999",
            status="Active" if i % 2 == 0 else "Inactive",
            device_id=f"DEV-{1000 + i}",
            subscription_status="Subscribed" if i % 2 == 0 else "Expired",
            subscription_end_date=date(2026, 12, (i % 28) + 1),
        )
        for i in range(count)
    ]

ALL_USERS = generate_dummy_users(100)

@router.get("/list", response_model=BaseResponse[ListResponse[UserResponse]])
async def GetUserList(
    request: Annotated[UserListRequest, Query()]
) -> BaseResponse[ListResponse[UserResponse]]:
    start = (request.page_no - 1) * request.page_size
    end = start + request.page_size
    paginated = ALL_USERS[start:end]

    return BaseResponse(
        data=ListResponse(
            list=paginated,
            total_count=len(ALL_USERS),
        ),
        message=None,
        token=None,
        status=True
    )

@router.post("/")
async def create_item(item: UserAddRequest) -> UserAddRequest:
    return item