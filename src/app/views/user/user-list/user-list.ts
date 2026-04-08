import { Component, OnInit } from '@angular/core';
import { PrimengComponentsModule } from '../../../shared/primeng-components-module';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-list',
  imports: [PrimengComponentsModule, TranslateModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit {

  customers: any[] = [];
  allCustomers: any[] = []; // full dataset

  selectedPageSize: number = 10;
  public totalCount: number = 0;
  public first: number = 0;

  ngOnInit(): void {
    // Generate dummy data (100 records)
    this.allCustomers = Array.from({ length: 100 }, (_, i) => ({
      firstName: 'User' + (i + 1),
      lastName: 'Test' + (i + 1),
      email: `user${i + 1}@mail.com`,
      phone: '9999999999',
      status: i % 2 === 0 ? 'Active' : 'Inactive',
      deviceId: 'DEV-' + (1000 + i),
      subscriptionStatus: i % 2 === 0 ? 'Subscribed' : 'Expired',
      subscriptionEndDate: new Date(2026, 11, (i % 28) + 1)
    }));

    this.totalCount = this.allCustomers.length;

    // initial load
    this.bindUserList({ first: 0, rows: this.selectedPageSize });
  }

  bindUserList(event: any) {
    const start = event.first || 0;
    const rows = event.rows || this.selectedPageSize;

    this.first = start;

    // slice data for current page
    this.customers = this.allCustomers.slice(start, start + rows);
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
}
