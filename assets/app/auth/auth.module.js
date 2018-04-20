import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register.component";
import { LoginComponent } from "./login.component";
import { LogoutComponent } from "./logout.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { AUTH_ROUTES } from "./auth.routes";
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [RegisterComponent, LoginComponent, LogoutComponent],
                    imports: [CommonModule, ReactiveFormsModule, AUTH_ROUTES]
                },] },
    ];
    return AuthModule;
}());
export { AuthModule };
