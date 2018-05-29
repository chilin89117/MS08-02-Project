import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector:'my-header',
  templateUrl:'./header.component.html'
})

export class HeaderComponent {
  constructor(private authService:AuthService) {}
  
  getRoute() {
    if(this.authService.isLoggedIn()) return ['/auth/logout'];
    return ['/auth/login'];
  }
}
