import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm: FormGroup;
  errorFlag: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  get email() {
    return this.forgetForm.get('email');
  }

  onSubmit(){}
}
