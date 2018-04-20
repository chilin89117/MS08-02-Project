import {Routes, RouterModule} from '@angular/router';
import {MsgsComponent} from './messages/msgs.component';
import {AuthComponent} from './auth/auth.component';

const APP_ROUTES: Routes = [
  {path: 'msgs', component: MsgsComponent},
  {path: 'auth', component: AuthComponent, loadChildren: './auth/auth.module#AuthModule'},
  {path: '', redirectTo: 'msgs', pathMatch: 'full'}
];

export const routes = RouterModule.forRoot(APP_ROUTES);