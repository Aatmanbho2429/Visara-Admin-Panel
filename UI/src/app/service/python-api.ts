import { Injectable } from '@angular/core';
import { catchError, finalize, from, Observable, throwError } from 'rxjs';
import { BaseResponse } from '../models/response/baseResponse';
import { LoaderService } from './loader.service';
import { UserAddRequest } from '../models/request/userAddRequest';


@Injectable({
    providedIn: 'root'
})
export class PythonApi {
    

    constructor(public loader:LoaderService) {
    }

     private call<T>(apiMethod: () => Promise<T>): Observable<T> {
        this.loader.show();

        return from(apiMethod()).pipe(
            catchError(err => {
                console.error('PyWebview API Error:', err);
                return throwError(() => new Error(err));
            }),
            finalize(() => this.loader.hide())   // hides loader on success OR error
        );
    }
    
     printHello(): Observable<string>{
        return this.call(() => window.pywebview.api.PrintHello());
    }

    AddUser(userRequestModel:UserAddRequest): Observable<string>{
        return this.call(() => window.pywebview.api.AddUser(userRequestModel));
    }
    
}

declare global {
  interface Window {
    pywebview: any;
  }
}
