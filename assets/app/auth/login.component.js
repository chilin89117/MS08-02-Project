import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './user.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.myForm = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            pwd: new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        var user = new User(this.myForm.value.email, this.myForm.value.pwd);
        this.authService.login(user)
            .subscribe(function (data) {
            localStorage.setItem('token', data.obj.token);
            localStorage.setItem('userId', data.obj.userId);
            console.log(data.status);
            console.log(data.obj);
            _this.router.navigateByUrl('/');
        }, function (error) { return console.log(error); });
        this.myForm.reset();
    };
    LoginComponent.decorators = [
        { type: Component, args: [{
                    selector: 'my-login',
                    templateUrl: './login.component.html'
                },] },
    ];
    /** @nocollapse */
    LoginComponent.ctorParameters = function () { return [
        { type: AuthService, },
        { type: Router, },
    ]; };
    return LoginComponent;
}());
export { LoginComponent };
