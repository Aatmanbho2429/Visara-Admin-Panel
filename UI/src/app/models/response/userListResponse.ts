export class UserListResponse {
    list: Array<User>;
    total_count: number;
}

export class User{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    status:boolean;
    deviceId: string;
    subscriptionStatus:boolean;
    subscriptionEndDate: Date;
}