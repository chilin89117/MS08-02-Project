import {Component} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector:'my-auth',
  templateUrl:'./auth.component.html'
})

export class AuthComponent {
  constructor(private authService:AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
