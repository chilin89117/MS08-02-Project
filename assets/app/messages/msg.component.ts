import {Component, Input, Output} from '@angular/core';
import {Message} from './msg.model';
import {MsgService} from './msg.service';

@Component({
  selector: 'my-msg',
  templateUrl: './msg.component.html'
})

export class MsgComponent {
  constructor(private MsgService: MsgService) {}

  // 'msg' comes from 'msg-list.component.*'
  @Input() msg: Message;

  onLoadEdit() {
    this.MsgService.loadEditMsg(this.msg);
  }

  onDelete() {
    this.MsgService.deleteMsg(this.msg)
        .subscribe((result) => console.log(result));
  }

  belongsToUser() {
    return localStorage.getItem('userId') === this.msg.userId;
  }
};