import { Component, Input } from '@angular/core';
import { Message } from './msg.model';
import { MsgService } from './msg.service';
var MsgComponent = /** @class */ (function () {
    function MsgComponent(MsgService) {
        this.MsgService = MsgService;
    }
    MsgComponent.prototype.onLoadEdit = function () {
        this.MsgService.loadEditMsg(this.msg);
    };
    MsgComponent.prototype.onDelete = function () {
        this.MsgService.deleteMsg(this.msg)
            .subscribe(function (result) { return console.log(result); });
    };
    MsgComponent.prototype.belongsToUser = function () {
        return localStorage.getItem('userId') === this.msg.userId;
    };
    MsgComponent.decorators = [
        { type: Component, args: [{
                    selector: 'my-msg',
                    templateUrl: './msg.component.html',
                    styleUrls: ['./msg.component.css']
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
