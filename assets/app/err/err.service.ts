import {EventEmitter} from "@angular/core";
import {Error} from './err.model';

export class ErrService {
  errOccurred = new EventEmitter<Error>();

  handleErr(err: any) {
    const errData = new Error(err.status, err.message);
    this.errOccurred.emit(errData);
  }
}