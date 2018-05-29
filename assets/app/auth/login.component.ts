import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {User} from './user.model';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector:'my-login',
  templateUrl:'./login.component.html'
})

export class LoginComponent implements OnInit {
  myForm:FormGroup;

  constructor(private authService:AuthService, private router:Router) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      email:new FormControl(null, [Validators.required, Validators.email]),
      pwd:new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    const user = new User(this.myForm.value.email, this.myForm.value.pwd);
    this.authService.login(user)
                    .subscribe(
                      data => {
                        localStorage.setItem('token', data.obj.token);
                        localStorage.setItem('userId', data.obj.userId);
                        this.router.navigateByUrl('/');
                      },
                      error => console.log(error)
                    );
    this.myForm.reset();
  }
}
