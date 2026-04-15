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

@Injectable({
  providedIn: 'root',
})
export class UserService extends CoreDataService {
  constructor(httpClient: HttpClient) {
    super(httpClient,environment.ApiUrl, Controllers.User);
  }

  // GetUserList(userListRequest: UserListRequest): Observable<BaseResponse<UserListResponse>> {
  //   return this.list<BaseResponse<UserListResponse>>(userListRequest,'/' + Action.list);
  // }
}
