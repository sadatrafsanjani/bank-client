import { Component, OnInit } from '@angular/core';
import {BalanceService} from '../service/balance.service';
import {CustomerService} from '../service/customer.service';
import {BalanceResponse} from '../response/balance-response';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  accountForm: FormGroup;
  balance: BalanceResponse;

  constructor(private customerService: CustomerService,
              private balanceService: BalanceService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.accountForm = new FormGroup({
      account: new FormControl('',
        [Validators.required, Validators.minLength(3)],
        this.checkAccountNo.bind(this))
    });
  }

  get account() {

    return this.accountForm.get('account');
  }

  onSubmit(){

    this.spinner.show();

    this.balanceService.checkCurrentBalance(this.account.value).subscribe(data => {
        this.balance = data;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }

  checkAccountNo(control: FormControl){

    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        this.customerService.checkCustomerAccountNo(control.value).subscribe(data => {
          if (data){
            resolve(null);
          }
          else{
            resolve({ isAccountInvalid: true });
          }
        });
      }, 1000);
    });

    return promise;
  }
}
