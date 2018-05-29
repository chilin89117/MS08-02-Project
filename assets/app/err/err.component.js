import { Component } from "@angular/core";
import { ErrService } from "./err.service";
var ErrComponent = /** @class */ (function () {
    function ErrComponent(errService) {
        this.errService = errService;
        this.display = 'none';
    }
    ErrComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.errService.errOccurred.subscribe(function (err) {
            _this.err = err;
            _this.display = 'block';
        });
    };
    ErrComponent.prototype.onErrHandled = function () {
        this.display = 'none';
    };
    ErrComponent.decorators = [
        { type: Component, args: [{
                    selector: 'my-err',
                    templateUrl: './err.component.html',
                    styles: ["\n    .backdrop {\n      background-color: rgba(0,0,0,0.6);\n      position: fixed;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100vh;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    ErrComponent.ctorParameters = function () { return [
        { type: ErrService, },
    ]; };
    return ErrComponent;
}());
export { ErrComponent };
