import { Component } from '@angular/core';
import { MsgService } from './msg.service';
var MsgListComponent = /** @class */ (function () {
    function MsgListComponent(MsgService) {
        this.MsgService = MsgService;
    }
    MsgListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.MsgService.getMsg()
            .subscribe(function (msgs) { return _this.messages = msgs; });
    };
    MsgListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'my-msg-list',
                    // Used in msgs.component.html
                    templateUrl: './msg-list.component.html',
                },] },
    ];
    /** @nocollapse */
    MsgListComponent.ctorParameters = function () { return [
        { type: MsgService, },
    ]; };
    return MsgListComponent;
}());
export { MsgListComponent };
