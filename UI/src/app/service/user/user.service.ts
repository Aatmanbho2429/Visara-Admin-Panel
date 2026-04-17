import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserListResponse } from '../../models/response/userListResponse';
import { Observable } from 'rxjs';
import { UserListRequest } from '../../models/request/userListRequest';
import { CoreDataService } from '../core-data.service';
import { environment } from "../../../environments/environment";
import { Controllers } from '../../models/constants/controller';
import { BaseResponse } from '../../models/response/baseResponse';
import { Action } from '../../models/constants/action';
import { UserAddRequest } from '../../models/request/userAddRequest';
import { UserGetByIdResponse } from '../../models/response/userGetByIdResponse';
import { UserEditRequest } from '../../models/request/userEditRequest';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CoreDataService {
  constructor(httpClient: HttpClient) {
    super(httpClient, environment.ApiUrl, Controllers.User);
  }

  GetUserList(userListRequest: UserListRequest): Observable<BaseResponse<UserListResponse>> {
    return this.post<UserListRequest, UserListResponse>(userListRequest, Action.list);
  }

  AddUser(userRequestModel: UserAddRequest): Observable<BaseResponse<string>> {
    return this.post<UserAddRequest, string>(userRequestModel, Action.Add);
  }

  DeleteUser(user_id: string): Observable<BaseResponse<string>> {
    return this.delete<string>(user_id, '');
  }

  GetUserById(user_id: string): Observable<BaseResponse<UserGetByIdResponse>> {
    return this.get<UserGetByIdResponse>(user_id, '');
  }

  EditUser(userEditRequestModel: UserEditRequest) {
    return this.put<UserEditRequest>('', Action.Edit, userEditRequestModel);
  }
}
