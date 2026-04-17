import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrimengComponentsModule } from '../../../shared/primeng-components-module';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SystemService } from '../../../service/system.service';
import { UserService } from '../../../service/user/user.service';
import { UserListRequest } from '../../../models/request/userListRequest';
import { PythonApi } from '../../../service/python-api';
import { Observable, Subscription } from 'rxjs';
import { BaseResponse } from '../../../models/response/baseResponse';
import { UserListResponse } from '../../../models/response/userListResponse';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [PrimengComponentsModule, TranslateModule,AsyncPipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit {

  customers: any[] = [];
  public pageState: any;
  selectedPageSize: number = 25;
  public totalCount: number = 0;
  public first: number = 0;
  public UserListRequest: UserListRequest = new UserListRequest();
  public isLoading: boolean = false;
  public subscription: Subscription = new Subscription()
  userListResponse$: Observable<BaseResponse<UserListResponse>>
  constructor(public messageService: MessageService, public confirmationService: ConfirmationService,
    public systemService: SystemService,
    public userService: UserService, public pythonApi: PythonApi,private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {

  }

  bindUserListModel() {

    const first = this.pageState?.first ?? 0;
    const rows = this.pageState?.rows ?? 25;

    this.UserListRequest.page_no = Math.floor(first / rows) + 1;

    this.UserListRequest.page_size = rows;
    this.UserListRequest.page_size =
      this.pageState && this.pageState.rows ? this.pageState.rows : 25;

    this.UserListRequest.sorting_type = "ASC";
    this.UserListRequest.sorting_column_name =
      this.pageState && this.pageState.sortField
        ? this.pageState.sortField
        : "";
    this.UserListRequest.search_text = '';
  }

  bindUserList(event: any) {

    this.selectedPageSize = event.rows;
    this.pageState = event;
    this.bindUserListModel();
    this.userListResponse$ = this.userService.GetUserList(this.UserListRequest);
    this.subscription.add(this.userListResponse$.subscribe(d => {
      this.customers = d.data.list;
      this.totalCount = d.data.total_count;
      this.cd.detectChanges();
    }))
    // this.userService.GetUserList(this.UserListRequest)
  }

  refreshList() {
    this.isLoading = false;
    this.bindUserList(this.pageState);
  }

  getSeverityStauts(status: boolean) {
    switch (status) {
      case true:
        return 'success';

      case false:
        return 'info';
    }
  }

  getRealStatus(status: boolean) {
    switch (status) {
      case true:
        return 'Active';

      case false:
        return 'In-Active';
    }
  }

  getSeveritySubscription(status: string) {
    switch (status) {
      case 'Expired':
        return 'danger';

      case 'Subscribed':
        return 'success';

      case 'Inactive':
        return 'info';

      case 'negotiation':
        return 'warn';

      case 'renewal':
        return null;
    }
    return null;
  }

  confirm2(event: Event, user_id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete User',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },

      accept: () => {
        this.userService.DeleteUser(user_id).subscribe(d => {
          if (d['success'] == false) {
            this.systemService.showError(d['message']);
          } else {
            this.systemService.showSuccess(d['message']);
          }
          this.refreshList();
        })

      },
      reject: () => {
        this.systemService.showError('You have rejected');
      }
    });

  }
}
