import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordPayload} from '../payload/password-payload';
import {AuthenticationService} from '../service/authentication.service';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  passwordPayload: PasswordPayload;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
    this.passwordPayload = {
      password: ''
    };
  }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      repassword: new FormControl('', [Validators.required, Validators.minLength(3)],
        this.checkPassword.bind(this)),
    });
  }

  get password() {

    return this.changePasswordForm.get('password');
  }

  get repassword() {

    return this.changePasswordForm.get('repassword');
  }

  onSubmit(){

    this.spinner.show();

    this.passwordPayload.password = this.password.value;
    const id = this.authenticationService.getId();

    this.userService.changePassword(id, this.passwordPayload).subscribe(
      data => {

        this.spinner.hide();

        this.router.navigateByUrl('/home');
        this.toastr.success('Password Changed!');

      },
      error => {
        this.spinner.hide();
        this.toastr.error('Please try again in a moment.');
      }
    );
  }

  checkPassword(control: FormControl){

    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.changePasswordForm.get('password').value !== control.value){
          resolve({ isPasswordMatched: true });
        }
        else{
          resolve(null);
        }
      }, 500);
    });

    return promise;
  }

}
