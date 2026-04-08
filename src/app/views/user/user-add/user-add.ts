import { Component } from '@angular/core';
import { PrimengComponentsModule } from '../../../shared/primeng-components-module';

@Component({
  selector: 'app-user-add',
  imports: [PrimengComponentsModule],
  templateUrl: './user-add.html',
  styleUrl: './user-add.scss',
})
export class UserAdd {}
