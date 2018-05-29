import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {User} from './user.model';

@Component({
  selector:'my-register',
  templateUrl:'./register.component.html'
})

export class RegisterComponent implements OnInit {
  myForm:FormGroup;

  constructor(private authService:AuthService) {};

  ngOnInit() {
    this.myForm = new FormGroup({
      fname:new FormControl(null, Validators.required),
      lname:new FormControl(null, Validators.required),
      email:new FormControl(null, [Validators.required, Validators.email]),
      pwd:new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    const user = new User(
      this.myForm.value.email,
      this.myForm.value.pwd,
      this.myForm.value.fname,
      this.myForm.value.lname
    );
    this.authService.register(user)
                    .subscribe(
                      data => {
                        console.log(data.status);
                        console.log(data.obj);
                      },
                      err => console.log(err)
                    );
    this.myForm.reset();
  }
}
