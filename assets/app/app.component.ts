import {Component} from '@angular/core';
import {MsgService} from './messages/msg.service';

@Component({
  selector: 'my-app', // Used in index.html
  templateUrl: './app.component.html',
  // Use hierarchical dependency injection to make service available
  // to all child components, instead of separate instances for each
  providers: [MsgService]
})

export class AppComponent {
  
};