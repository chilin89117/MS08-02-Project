import { RouterModule } from "@angular/router";
import { RegisterComponent } from "./register.component";
import { LoginComponent } from "./login.component";
import { LogoutComponent } from "./logout.component";
// These are child routes under /auth
var routes = [
    // {path: '', redirectTo: 'register', pathMatch: 'full'},
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent }
];
export var AUTH_ROUTES = RouterModule.forChild(routes);
