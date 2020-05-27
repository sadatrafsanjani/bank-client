import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginPayload} from '../payload/login-payload';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayload: LoginPayload;
  errorFlag: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
    this.loginPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {

    if (this.authenticationService.isAuthenticated()){
      if (this.authenticationService.isAdmin()){
        this.router.navigateByUrl('/dashboard');
      }
      else if (this.authenticationService.isUser()){
        this.router.navigateByUrl('/home');
      }
    }

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(){

    this.spinner.show();

    this.loginPayload.username = this.username.value.trim();
    this.loginPayload.password = this.password.value.trim();

    this.authenticationService.login(this.loginPayload).subscribe(
      data => {

        this.spinner.hide();
        this.errorFlag = false;

        if (this.authenticationService.isAdmin()){
          this.router.navigateByUrl('/dashboard');
        }
        else if (this.authenticationService.isUser()){
          this.router.navigateByUrl('/home');
        }
        else{
          this.router.navigateByUrl('/');
        }

        this.toastr.success('Login Successful!');
      },
      error => {
        this.spinner.hide();
        this.errorFlag = true;
      }
    );
  }

}
