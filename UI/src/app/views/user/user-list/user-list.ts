import { Component, OnInit } from '@angular/core';
import { PrimengComponentsModule } from '../../../shared/primeng-components-module';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SystemService } from '../../../service/system.service';
import { UserService } from '../../../service/user/user.service';
import { UserListRequest } from '../../../models/request/userListRequest';

@Component({
  selector: 'app-user-list',
  imports: [PrimengComponentsModule, TranslateModule],
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
  
  constructor(public messageService: MessageService, public confirmationService: ConfirmationService,
    public systemService: SystemService,
    public userService: UserService
  ) {

  }

  ngOnInit(): void {
    // this.bindUserList(event)
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
    if (this.isLoading) return;  // ← prevent duplicate calls
    this.isLoading = true;

    this.selectedPageSize = event.rows;
    this.pageState = event;
    this.bindUserListModel();
    this.userService.GetUserList(this.UserListRequest).subscribe(d => {
      this.customers = d.data.list;
      this.totalCount = d.data.total_count;
      this.isLoading = false;
    });
  }

  getSeverityStauts(status: string) {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'Active':
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

  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
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
        this.systemService.showSuccess('Record deleted successfully');
      },
      reject: () => {
        this.systemService.showError('You have rejected');
      }
    });
  }
}
