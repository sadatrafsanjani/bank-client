import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../service/customer.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {BalanceService} from '../service/balance.service';
import {BalanceResponse} from '../response/balance-response';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  accountForm: FormGroup;
  balances: Array<BalanceResponse>;

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

    this.balanceService.checkTransactionHistory(this.account.value).subscribe(data => {
        this.balances = data;
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
