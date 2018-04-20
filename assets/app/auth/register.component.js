import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { User } from './user.model';
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(authService) {
        this.authService = authService;
    }
    ;
    RegisterComponent.prototype.ngOnInit = function () {
        this.myForm = new FormGroup({
            fname: new FormControl(null, Validators.required),
            lname: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            pwd: new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    };
    RegisterComponent.prototype.onSubmit = function () {
        var user = new User(this.myForm.value.email, this.myForm.value.pwd, this.myForm.value.fname, this.myForm.value.lname);
        this.authService.register(user)
            .subscribe(function (data) {
            console.log(data.status);
            console.log(data.obj);
        }, function (err) { return console.log(err); });
        this.myForm.reset();
    };
    RegisterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'my-register',
                    templateUrl: './register.component.html'
                },] },
    ];
    /** @nocollapse */
    RegisterComponent.ctorParameters = function () { return [
        { type: AuthService, },
    ]; };
    return RegisterComponent;
}());
export { RegisterComponent };
