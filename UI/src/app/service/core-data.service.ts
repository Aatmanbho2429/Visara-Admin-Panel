import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BaseResponse } from '../models/response/baseResponse';

@Injectable({
  providedIn: 'root',
})
export class CoreDataService {
  private readonly url: string = '';
  private readonly endpoint: string = '';
  companyId: string = '';
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(String) url: string,
    @Inject(String) endpoint: string
  ) {
    this.url = url;
    this.endpoint = endpoint;
  }

  private getHeader(): HttpHeaders {
    const headerss = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'false',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      //Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      // Authorization: `Bearer ${this.cookie.GetCookie(
      //   CookieConstant.Web_Token
      // )}`,
      // 'CompanyId': this.cookie.GetCookie(CookieConstant.cal_SelectedLanguage) == "1" ? '' : this.cookie.GetCookie(CookieConstant.cal_SelectedLanguage)
    });

    return headerss;
  }

  put<T>(
    id: string | number,
    action: string,
    resource: T
  ): Observable<BaseResponse<T>> {
    return this.httpClient
      .put<BaseResponse<T>>(
        `${this.url}/${this.endpoint}` +
        (action != '' ? `/${action}` : '') +
        (id != 0 ? `/${id}` : ''),
        JSON.stringify(resource),
        {
          headers: this.getHeader(),
        }
      )
      .pipe(
        map((list) => list),
        catchError(this.handleError)
      );
  }
  post<T, RS>(resource: T, action: string): Observable<BaseResponse<RS>> {
    return this.httpClient
      .post<BaseResponse<RS>>(
        `${this.url}/${this.endpoint}/${action}`,
        JSON.stringify(resource),
        {
          headers: this.getHeader(),
        }
      )
      .pipe(
        map((list) => list),
        catchError(this.handleError)
      );
  }

  get<RS>(id: string | number, action: string): Observable<BaseResponse<RS>> {
    return this.httpClient
      .get<BaseResponse<RS>>(
        `${this.url}/${this.endpoint}` +
        (action != '' ? `/${action}` : '') +
        `/${id}`,
        {
          headers: this.getHeader(),
        }
      )
      .pipe(
        map((list) => list),
        catchError(this.handleError)
      );
  }
  getUI<RS>(id: string | number, action: string): Observable<BaseResponse<RS>> {
    return this.httpClient
      .get<BaseResponse<RS>>(
        `${this.url}/${this.endpoint}` +
        (action != '' ? `/${action}` : '') +
        `/${id}`,
        {
          headers: this.getHeader(),
        }
      )
      .pipe(
        map((list) => list),
        catchError(this.handleError)
      );
  }

  list<RS>(queryString: object, action: string): Observable<BaseResponse<RS>> {
    return this.httpClient
      .get<BaseResponse<RS>>(
        `${this.url}/${this.endpoint}${action}` +
        (Object.keys(queryString).length > 0
          ? `?${this.toQueryParams(queryString)}`
          : ''),
        {
          headers: this.getHeader(),
        }
      )
      .pipe(
        map((list) => list),
        catchError(this.handleError)
      );
  }

  delete<RS>(
    id: string | number,
    action: string
  ): Observable<BaseResponse<RS>> {
    return this.httpClient
      .delete<BaseResponse<RS>>(
        `${this.url}/${this.endpoint}` +
        (action != '' ? `/${action}` : '') +
        `/${id}`,
        {
          headers: this.getHeader(),
        }
      )
      .pipe(
        map((list) => list),
        catchError(this.handleError)
      );
  }

  getWithParams<RS>(
    action: string,
    params: HttpParams
  ): Observable<BaseResponse<RS>> {
    return this.httpClient
      .get<BaseResponse<RS>>(
        `${this.url}/${this.endpoint}${action !== '' ? `/${action}` : ''}`,
        {
          headers: this.getHeader(),
          params: params,
        }
      )
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    // Handle the HTTP error here

    if (error.status == 500) {
      if (
        JSON.parse(error._body).ExceptionMessage ==
        'authorization token expired' ||
        JSON.parse(error._body).ExceptionMessage ==
        'authorization token is missing' ||
        JSON.parse(error._body).ExceptionMessage ==
        'invalid authorization token'
      ) {
        //this.adalService.login();
        // Over Here Call Login Page
      } else {
        console.log(error);
      }
    } else {
      console.log(error);
    }
    return throwError('Something wrong happened');
  }
  toQueryParams<T>(data: T) {
    return Object.entries(data)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&');
  }
}
