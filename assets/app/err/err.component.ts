import {Component, OnInit} from "@angular/core";
import {Error} from './err.model';
import {ErrService} from "./err.service";

@Component({
  selector: 'my-err',
  templateUrl: './err.component.html',
  styles: [`
    .backdrop {
      background-color: rgba(0,0,0,0.6);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
    }
  `]
})

export class ErrComponent implements OnInit {
  public err:Error;
  public display = 'none';

  constructor(private errService:ErrService) {}

  ngOnInit() {
    this.errService.errOccurred.subscribe(
      (err:Error) => {
        this.err = err;
        this.display = 'block';
      }
    )
  }

  onErrHandled() {
    this.display = 'none';
  }
}