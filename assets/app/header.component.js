import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authService) {
        this.authService = authService;
    }
    HeaderComponent.prototype.getRoute = function () {
        if (this.authService.isLoggedIn())
            return ['/auth/logout'];
        return ['/auth/login'];
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'my-header',
                    templateUrl: './header.component.html'
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: AuthService, },
    ]; };
    return HeaderComponent;
}());
export { HeaderComponent };
