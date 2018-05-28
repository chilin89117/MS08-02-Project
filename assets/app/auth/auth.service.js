import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { ErrService } from "../err/err.service";
var AuthService = /** @class */ (function () {
    function AuthService(http, errService) {
        this.http = http;
        this.errService = errService;
    }
    AuthService.prototype.register = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        var headers = new Headers({ 'content-type': 'application/json' });
        return this.http.post('http://localhost:3000/api/users', body, { headers: headers })
            .map(function (resp) { return resp.json(); })
            .catch(function (err) {
            _this.errService.handleErr(err.json());
            return Observable.throw(err.json());
        });
    };
    AuthService.prototype.login = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        var headers = new Headers({ 'content-type': 'application/json' });
        return this.http.post('http://localhost:3000/api/users/login', body, { headers: headers })
            .map(function (resp) { return resp.json(); })
            .catch(function (err) {
            _this.errService.handleErr(err.json());
            return Observable.throw(err.json());
        });
    };
    AuthService.prototype.logout = function () {
        localStorage.clear();
    };
    AuthService.prototype.isLoggedIn = function () {
        return localStorage.getItem('token') !== null;
    };
    AuthService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: Http, },
        { type: ErrService, },
    ]; };
    return AuthService;
}());
export { AuthService };
