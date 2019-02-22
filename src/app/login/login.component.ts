import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    constructor(private router: Router,
  private authservice: AuthService) {}

    ngOnInit() {
      this.loginForm = new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
      });
    }
    onLogin() {
      console.log(this.loginForm.value.username + '' + this.loginForm.value.password);
      this.authservice.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        (res) => {
          if (res.success) {
            localStorage.setItem('isLoggedin', 'true');
            this.router.navigate(['/dashboard']);
          }
        }, (err) => { console.log(err); } );
    }
}
