import { Routes } from '@angular/router';
import { Master } from './views/master/master';

export const routes: Routes = [
    {path:'',component:Master, loadChildren:()=>import('./views/user/user.routes').then(m=>m.routes)
    }
];
