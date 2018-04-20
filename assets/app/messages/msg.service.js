import { Http, Headers } from '@angular/http';
import { Message } from './msg.model';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { ErrService } from '../err/err.service';
var MsgService = /** @class */ (function () {
    function MsgService(http, errService) {
        this.http = http;
        this.errService = errService;
        this.messages = [];
        this.MsgEdit = new EventEmitter();
    }
    MsgService.prototype.addMsg = function (msg) {
        var _this = this;
        var body = JSON.stringify(msg);
        var headers = new Headers({ 'content-type': 'application/json' });
        var token = localStorage.getItem('token');
        if (token)
            token = '?token=' + token;
        else
            token = '';
        return this.http.post('https://ms08-02.herokuapp.com/api/msgs' + token, body, { headers: headers })
            .map(function (resp) {
            var result = resp.json().obj;
            var newMsg = new Message(result.content, result.user.fname, result._id, result.user._id);
            _this.messages.push(newMsg);
            return newMsg;
        })
            .catch(function (err) {
            _this.errService.handleErr(err.json());
            return Observable.throw(err.json());
        });
    };
    MsgService.prototype.getMsg = function () {
        var _this = this;
        return this.http.get('https://ms08-02.herokuapp.com/api/msgs')
            .map(function (resp) {
            var msgs = resp.json().obj;
            var transformedMsgs = [];
            for (var _i = 0, msgs_1 = msgs; _i < msgs_1.length; _i++) {
                var m = msgs_1[_i];
                transformedMsgs.push(new Message(m.content, m.user.fname, m._id, m.user._id));
            }
            _this.messages = transformedMsgs;
            return transformedMsgs;
        })
            .catch(function (err) {
            _this.errService.handleErr(err.json());
            return Observable.throw(err.json());
        });
    };
    MsgService.prototype.loadEditMsg = function (msg) {
        this.MsgEdit.emit(msg);
    };
    MsgService.prototype.updateMsg = function (msg) {
        var _this = this;
        console.log(msg);
        var body = JSON.stringify(msg);
        var token = localStorage.getItem('token');
        if (token)
            token = '?token=' + token;
        else
            token = '';
        var headers = new Headers({ 'content-type': 'application/json' });
        return this.http.patch('https://ms08-02.herokuapp.com/api/msgs/' + msg.messageId + token, body, { headers: headers })
            .catch(function (err) {
            _this.errService.handleErr(err.json());
            return Observable.throw(err.json());
        });
    };
    MsgService.prototype.deleteMsg = function (msg) {
        var _this = this;
        var token = localStorage.getItem('token');
        if (token)
            token = '?token=' + token;
        else
            token = '';
        this.messages.splice(this.messages.indexOf(msg), 1);
        return this.http.delete('https://ms08-02.herokuapp.com/api/msgs/' + msg.messageId + token)
            .catch(function (err) {
            _this.errService.handleErr(err.json());
            return Observable.throw(err.json());
        });
    };
    MsgService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MsgService.ctorParameters = function () { return [
        { type: Http, },
        { type: ErrService, },
    ]; };
    return MsgService;
}());
export { MsgService };
