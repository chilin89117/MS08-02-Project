import {Http, Response, Headers} from '@angular/http';
import {Message} from './msg.model';
import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {ErrService} from '../err/err.service';

@Injectable()

export class MsgService {
  private messages:Message[] = [];

  MsgEvtEmitter = new EventEmitter<Message>();
  headers = new Headers({'content-type':'application/json'});

  constructor(private http:Http, private errService:ErrService) {}

  addMsg(msg:Message) {
    const body = JSON.stringify(msg);
        
    let token = localStorage.getItem('token');
    if(token) token = '?token=' + token;
    else token = '';

    return this.http
                .post('http://localhost:3000/api/msgs' + token, body, {headers:this.headers})
                .pipe(
                  map((resp:Response) => {
                    const result = resp.json().obj;
                    const newMsg = new Message(result.content, result.user.fname, result._id, result.user._id);
                    this.messages.push(newMsg);
                    return newMsg;
                  }),
                  catchError((err:Response) => {
                    this.errService.handleErr(err.json());
                    return Observable.throw(err.json());
                  })
                );
  }

  getMsg() {
    return this.http
                .get('http://localhost:3000/api/msgs')
                .pipe(
                  map((resp:Response) => {
                    const msgs = resp.json().obj;
                    let transformedMsgs:Message[] = [];
                    for(let m of msgs) {
                      transformedMsgs.push(new Message(m.content, m.user.fname, m._id, m.user._id));
                    }
                    this.messages = transformedMsgs;
                    return transformedMsgs;
                  }),
                  catchError((err:Response) => {
                    this.errService.handleErr(err.json());
                    return Observable.throw(err.json());
                  })
                );
  }

  loadMsg(msg:Message) {
    this.MsgEvtEmitter.emit(msg);
  }

  updateMsg(msg:Message) {
    const body = JSON.stringify(msg);

    let token = localStorage.getItem('token');
    if(token) token = '?token=' + token;
    else token = '';

    return this.http
                .patch('http://localhost:3000/api/msgs/' + msg.messageId + token, body, {headers:this.headers})
                .pipe(
                  catchError((err:Response) => {
                    this.errService.handleErr(err.json());
                    return Observable.throw(err.json());
                  })
                );
  }

  deleteMsg(msg:Message) {
    let token = localStorage.getItem('token');
    if(token) token = '?token=' + token;
    else token = '';

    this.messages.splice(this.messages.indexOf(msg), 1);
    return this.http
                .delete('http://localhost:3000/api/msgs/' + msg.messageId + token)
                .pipe(
                  catchError((err:Response) => {
                    this.errService.handleErr(err.json());
                    return Observable.throw(err.json());
                  })
                );
  }
}