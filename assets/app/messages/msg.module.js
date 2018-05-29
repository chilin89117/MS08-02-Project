import { NgModule } from "@angular/core";
import { MsgInputComponent } from "./msg-input.component";
import { MsgListComponent } from "./msg-list.component";
import { MsgComponent } from "./msg.component";
import { MsgsComponent } from "./msgs.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MsgService } from "./msg.service";
var MsgModule = /** @class */ (function () {
    function MsgModule() {
    }
    MsgModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [MsgInputComponent, MsgListComponent, MsgComponent, MsgsComponent],
                    imports: [CommonModule, FormsModule],
                    providers: [MsgService]
                },] },
    ];
    return MsgModule;
}());
export { MsgModule };
