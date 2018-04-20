import { Component } from '@angular/core';
import { MsgService } from './msg.service';
import { Message } from './msg.model';
var MsgInputComponent = /** @class */ (function () {
    function MsgInputComponent(MsgService) {
        this.MsgService = MsgService;
    }
    MsgInputComponent.prototype.onSubmit = function (form) {
        if (this.msg) {
            this.msg.content = form.value.content;
            this.MsgService.updateMsg(this.msg)
                .subscribe(function (result) { return console.log(result); }, function (error) { return console.log(error); });
            this.msg = null;
        }
        else {
            var newMsg = new Message(form.value.content);
            this.MsgService.addMsg(newMsg)
                .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
        }
        this.onClear(form);
    };
    MsgInputComponent.prototype.onClear = function (form) {
        this.msg = null;
        form.resetForm();
    };
    MsgInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.MsgService.MsgEdit.subscribe(function (msg) { return _this.msg = msg; });
    };
    MsgInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'my-msg-input',
                    templateUrl: './msg-input.component.html',
                },] },
    ];
    /** @nocollapse */
    MsgInputComponent.ctorParameters = function () { return [
        { type: MsgService, },
    ]; };
    return MsgInputComponent;
}());
export { MsgInputComponent };
