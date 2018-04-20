import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {User} from "./user.model";
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import {ErrService} from "../err/err.service";

@Injectable()

export class AuthService {
  constructor(private http: Http, private errService: ErrService) {}

  register(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'content-type': 'application/json'});
    return this.http.post('https://ms08-02.herokuapp.com/api/users', body, {headers})
                    .map((resp: Response) => resp.json())
                    .catch((err: Response) => {
                      this.errService.handleErr(err.json());
                      return Observable.throw(err.json());
                    });
  }

  login(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'content-type': 'application/json'});
    return this.http.post('https://ms08-02.herokuapp.com/api/users/login', body, {headers})
               .map((resp: Response) => resp.json())
               .catch((err: Response) => {
                this.errService.handleErr(err.json());
                return Observable.throw(err.json());
               });
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}