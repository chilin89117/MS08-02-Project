import { Component, Input } from '@angular/core';
import { Message } from './msg.model';
import { MsgService } from './msg.service';
var MsgComponent = /** @class */ (function () {
    function MsgComponent(MsgService) {
        this.MsgService = MsgService;
    }
    MsgComponent.prototype.onLoadMsg = function () {
        this.MsgService.loadMsg(this.msg);
    };
    MsgComponent.prototype.onDelete = function () {
        if (confirm('Are you sure?')) {
            this.MsgService.deleteMsg(this.msg)
                .subscribe(function (result) { return console.log(result); });
        }
    };
    MsgComponent.prototype.belongsToUser = function () {
        return localStorage.getItem('userId') === this.msg.userId;
    };
    MsgComponent.decorators = [
        { type: Component, args: [{
                    selector: 'my-msg',
                    templateUrl: './msg.component.html',
                    styles: ['.card {max-height: 200px;}']
                },] },
    ];
    /** @nocollapse */
    MsgComponent.ctorParameters = function () { return [
        { type: MsgService, },
    ]; };
    MsgComponent.propDecorators = {
        "msg": [{ type: Input },],
    };
    return MsgComponent;
}());
export { MsgComponent };
;
