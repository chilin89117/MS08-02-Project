import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
var LogoutComponent = /** @class */ (function () {
    function LogoutComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    LogoutComponent.prototype.onLogout = function () {
        this.authService.logout();
        this.router.navigate(['/auth', 'login']);
    };
    LogoutComponent.decorators = [
        { type: Component, args: [{
                    selector: 'my-logout',
                    templateUrl: './logout.component.html'
                },] },
    ];
    /** @nocollapse */
    LogoutComponent.ctorParameters = function () { return [
        { type: AuthService, },
        { type: Router, },
    ]; };
    return LogoutComponent;
}());
export { LogoutComponent };
;
