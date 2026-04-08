export class UserListRequest{
    page_no: number=1;
    page_size: number=10;
    sorting_column_name: string='';
    sorting_type : string='asc';
    search_text : string='';
}