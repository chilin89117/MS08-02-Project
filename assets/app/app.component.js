import { Component } from '@angular/core';
import { MsgService } from './messages/msg.service';
var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.decorators = [
        { type: Component, args: [{
                    selector: 'my-app',
                    // Used in index.html
                    templateUrl: './app.component.html',
                    // Use hierarchical dependency injection to make service available
                    // to all child components, instead of separate instances for each
                    providers: [MsgService]
                },] },
    ];
    return AppComponent;
}());
export { AppComponent };
;
