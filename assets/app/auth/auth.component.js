import { Component } from '@angular/core';
import { AuthService } from './auth.service';
var AuthComponent = /** @class */ (function () {
    function AuthComponent(authService) {
        this.authService = authService;
    }
    AuthComponent.prototype.isLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    AuthComponent.decorators = [
        { type: Component, args: [{
                    selector: 'my-auth',
                    templateUrl: './auth.component.html'
                },] },
    ];
    /** @nocollapse */
    AuthComponent.ctorParameters = function () { return [
        { type: AuthService, },
    ]; };
    return AuthComponent;
}());
export { AuthComponent };
