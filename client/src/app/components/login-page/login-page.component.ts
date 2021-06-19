import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  login = {
    username: '',
    password: ''
  };
  register = {
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  };
  loginError = '';
  registerError = '';

  constructor(private authService: AuthService, private router: Router) { }

  validateLogin(): boolean {
    return !!this.login.username
      && this.login.username.trim().length >= 3
      && this.login.username.trim().length <= 32
      && !!this.login.password;
  }

  validateRegister(): boolean {
    return !!this.register.username
    && this.register.username.trim().length >= 3
    && this.register.username.trim().length <= 32
    && !!this.register.password
    && this.register.password === this.register.confirmPassword
    && !!this.register.email.trim()
    && this.register.email.trim().length >= 3
    && this.register.email.trim().length <= 64;
  }

  onLogin() {
    this.authService.login({username: this.login.username, password: this.login.password}).subscribe(r => {
      if (!r.error) {
        this.router.navigateByUrl('/');
      }

      this.loginError = r.error;
    });
  }

  onRegister() {
    this.authService.register({
      username: this.register.username,
      password: this.register.password,
      email: this.register.email}).subscribe(r => {
        if (!r.error) {
          this.router.navigateByUrl('/');
        }

        this.registerError = r.error;
    });
  }

  ngOnInit() {
    console.log(`PRODUCTION: ${environment.production}`);
  }
}
