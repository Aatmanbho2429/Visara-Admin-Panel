import { Component } from '@angular/core';
import { PrimengComponentsModule } from '../../../shared/primeng-components-module';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-add',
  imports: [PrimengComponentsModule,TranslateModule],
  templateUrl: './user-add.html',
  styleUrl: './user-add.scss',
})
export class UserAdd {}
