export class BaseResponse<T> {
    success: boolean;
    data: T;
    message: string;
    token:string;
    
}
