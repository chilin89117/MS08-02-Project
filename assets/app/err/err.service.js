import { EventEmitter } from "@angular/core";
import { Error } from './err.model';
var ErrService = /** @class */ (function () {
    function ErrService() {
        this.errOccurred = new EventEmitter();
    }
    ErrService.prototype.handleErr = function (err) {
        var errData = new Error(err.status, err.message);
        this.errOccurred.emit(errData);
    };
    return ErrService;
}());
export { ErrService };
