import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterPayload} from '../payload/register-payload';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {ProductService} from '../service/product.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  registerForm: FormGroup;
  registerPayload: RegisterPayload;
  randomPassword: string;

  constructor(private authenticationService: AuthenticationService,
              private productService: ProductService,
              private router: Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
    this.registerPayload = {
      username: '',
      password: '',
      email: ''
    };
  }

  ngOnInit() {

    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required, Validators.minLength(3)
      ], this.checkUsername.bind(this)),
      password: new FormControl('', [
        Validators.required, Validators.minLength(3)
      ]),
      repassword: new FormControl('', [
        Validators.required, Validators.minLength(3)
      ], this.checkPassword.bind(this)),
      email: new FormControl('', [
        Validators.required, Validators.email, Validators.minLength(3)
      ], this.checkEmail.bind(this))
    });
  }

  get username() {

    return this.registerForm.get('username');
  }

  get password() {

    return this.registerForm.get('password');
  }

  get repassword() {

    return this.registerForm.get('repassword');
  }

  get email() {

    return this.registerForm.get('email');
  }

  onSubmit(){

    this.spinner.show();

    this.registerPayload.username = this.username.value;
    this.registerPayload.password = this.password.value;
    this.registerPayload.email = this.email.value;

    this.authenticationService.register(this.registerPayload).subscribe(
      data => {
        this.spinner.hide();
        this.router.navigateByUrl('/users');
        this.toastr.success('User Created');
      },
      error => {
        this.spinner.hide();
        this.toastr.error('User Creation Failed! Please try again.');
      }
    );
  }

  checkUsername(control: FormControl){

    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        this.authenticationService.checkUsername(control.value.toLowerCase()).subscribe(data => {
          if (data){
            resolve({ isUsernameUnique: true });
          }
          else{
            resolve(null);
          }
        });
      }, 1000);
    });

    return promise;
  }

  checkEmail(control: FormControl){

    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        this.authenticationService.checkEmail(control.value.toLowerCase()).subscribe(data => {
          if (data){
            resolve({ isEmailUnique: true });
          }
          else{
            resolve(null);
          }
        });
      }, 1000);
    });

    return promise;
  }

  checkPassword(control: FormControl){

    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.registerForm.get('password').value !== control.value){
          resolve({ isPasswordMatched: true });
        }
        else{
          resolve(null);
        }
      }, 1000);
    });

    return promise;
  }

  generateRandomPassword() {

    this.randomPassword = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 3);

    this.password.setValue(this.randomPassword);
    this.repassword.setValue(this.randomPassword);
  }

}
