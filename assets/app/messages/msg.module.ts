import {NgModule} from "@angular/core";
import {MsgInputComponent} from "./msg-input.component";
import {MsgListComponent} from "./msg-list.component";
import {MsgComponent} from "./msg.component";
import {MsgsComponent} from "./msgs.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MsgService} from "./msg.service";

@NgModule({
  declarations: [MsgInputComponent, MsgListComponent, MsgComponent, MsgsComponent],
  imports: [CommonModule, FormsModule],
  providers: [MsgService]
})

export class MsgModule {

}
