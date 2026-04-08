import { Routes } from '@angular/router';
import { UserList } from './user-list/user-list';
import { UserAdd } from './user-add/user-add';
import { UserEdit } from './user-edit/user-edit';

export const routes: Routes = [
    {path: '',component:UserList},
    {path: 'add',component:UserAdd},
    {path: 'edit/:id',component:UserEdit}
];
