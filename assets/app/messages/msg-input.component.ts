import {Component, OnInit} from '@angular/core';
import {MsgService} from './msg.service';
import {Message} from './msg.model';
import {NgForm} from '@angular/forms';

@Component({
  selector:'my-msg-input',
  templateUrl:'./msg-input.component.html',
})
export class MsgInputComponent implements OnInit {
  msg:Message;

  constructor(private MsgService:MsgService) {}

  ngOnInit() {
    this.MsgService.MsgEvtEmitter
                    .subscribe((msg:Message) => this.msg = msg);
  }
  
  onSubmit(form:NgForm) {
    if(this.msg) {
      this.msg.content = form.value.content;
      this.MsgService.updateMsg(this.msg)
                      .subscribe(
                        result => console.log(result),
                        error => console.log(error)
                      );
      this.msg = null;
    } else {
      const newMsg = new Message(form.value.content);
      this.MsgService.addMsg(newMsg)
                      .subscribe(
                        data => console.log(data),
                        error => console.log(error)
                      );
    }
    this.onClear(form);
  }

  onClear(form:NgForm) {
    this.msg = null;
    form.resetForm();
  }
}
