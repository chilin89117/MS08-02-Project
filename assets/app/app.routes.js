import { RouterModule } from '@angular/router';
import { MsgsComponent } from './messages/msgs.component';
import { AuthComponent } from './auth/auth.component';
var APP_ROUTES = [
    { path: 'msgs', component: MsgsComponent },
    { path: 'auth', component: AuthComponent, loadChildren: './auth/auth.module#AuthModule' },
    { path: '', redirectTo: 'msgs', pathMatch: 'full' }
];
export var routes = RouterModule.forRoot(APP_ROUTES);
