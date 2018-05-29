import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {User} from "./user.model";
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {ErrService} from "../err/err.service";

@Injectable()

export class AuthService {
  constructor(private http:Http, private errService:ErrService) {}

  headers = new Headers({'content-type':'application/json'});

  register(user:User) {
    const body = JSON.stringify(user);
    return this.http
                .post('http://localhost:3000/api/users', body, {headers: this.headers})
                .pipe(
                  map((resp:Response) => resp.json()),
                  catchError((err:Response) => {
                    this.errService.handleErr(err.json());
                    return Observable.throw(err.json());
                  })
                );
  }

  login(user:User) {
    const body = JSON.stringify(user);
    return this.http
                .post('http://localhost:3000/api/users/login', body, {headers: this.headers})
                .pipe(
                  map((resp:Response) => resp.json()),
                  catchError((err:Response) => {
                    this.errService.handleErr(err.json());
                    return Observable.throw(err.json());
                  })
                );
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
