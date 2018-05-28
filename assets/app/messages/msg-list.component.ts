import {Component, OnInit} from '@angular/core';
import {Message} from './msg.model';
import {MsgService} from './msg.service';

@Component({
  selector: 'my-msg-list',  // Used in msgs.component.html
  templateUrl: './msg-list.component.html',
})

export class MsgListComponent implements OnInit {
  public messages: Message[];

  constructor(private MsgService: MsgService) {}

  ngOnInit() {
    this.MsgService.getMsg()
        .subscribe((msgs: Message[]) => this.messages = msgs);
  }
}