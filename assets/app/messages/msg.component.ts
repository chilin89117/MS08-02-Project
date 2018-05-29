import {Component, Input, Output} from '@angular/core';
import {Message} from './msg.model';
import {MsgService} from './msg.service';

@Component({
  selector:'my-msg',
  templateUrl:'./msg.component.html',
  styles: ['.card {max-height: 200px;}']
})

export class MsgComponent {
  constructor(private MsgService:MsgService) {}

  // 'msg' comes from 'msg-list.component.*'
  @Input() msg:Message;

  onLoadMsg() {
    this.MsgService.loadMsg(this.msg);
  }

  onDelete() {
    if(confirm('Are you sure?')) {
      this.MsgService.deleteMsg(this.msg)
                      .subscribe(
                        result => console.log(result)
                      );
    }
  }

  belongsToUser() {
    return localStorage.getItem('userId') === this.msg.userId;
  }
};
