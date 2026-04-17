import { Injectable, NgZone } from '@angular/core';
import { catchError, finalize, from, map, Observable, throwError } from 'rxjs';
import { BaseResponse } from '../models/response/baseResponse';
import { LoaderService } from './loader.service';
import { UserAddRequest } from '../models/request/userAddRequest';
import { UserListResponse } from '../models/response/userListResponse';
import { UserListRequest } from '../models/request/userListRequest';
import { UserGetByIdResponse } from '../models/response/userGetByIdResponse';
import { UserEditRequest } from '../models/request/userEditRequest';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class PythonApi {

    constructor(
        public loader: LoaderService,
        private zone: NgZone,public httpClient: HttpClient
    ) {}

    private call<T>(apiMethod: () => Promise<T>): Observable<T> {
        this.loader.show();

        const zoned = new Promise<T>((resolve, reject) => {
            apiMethod()
                .then(result => this.zone.run(() => resolve(result)))
                .catch(err   => this.zone.run(() => reject(err)));
        });

        return from(zoned).pipe(
            catchError(err => {
                console.error('PyWebview API Error:', err);
                return throwError(() => new Error(err));
            }),
            finalize(() => this.loader.hide())
        );
    }

    printHello(): Observable<string> {
        return this.httpClient.get<string>('http://127.0.0.1:8000/hello').pipe(map((list) => list))
    }

    AddUser(userRequestModel: UserAddRequest): Observable<BaseResponse<string>> {
        return this.call(() => window.pywebview.api.AddUser(userRequestModel));
    }

    GetUserList(userListRequest: UserListRequest): Observable<BaseResponse<UserListResponse>> {
        return this.call(() => window.pywebview.api.GetUserList(userListRequest));
    }

    DeleteUser(user_id: string): Observable<BaseResponse<number>> {
        return this.call(() => window.pywebview.api.DeleteUser(user_id));
    }

    GetUserById(user_id: string): Observable<BaseResponse<UserGetByIdResponse>> {
        return this.call(() => window.pywebview.api.GetUserById(user_id));
    }

    EditUser(userEditRequestModel: UserEditRequest): Observable<BaseResponse<string>> {
        return this.call(() => window.pywebview.api.EditUser(userEditRequestModel));
    }

}

declare global {
    interface Window {
        pywebview: any;
    }
}