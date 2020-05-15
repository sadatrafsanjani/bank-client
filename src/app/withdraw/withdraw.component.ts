import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TransactionPayload} from '../payload/transaction-payload';
import {AuthenticationService} from '../service/authentication.service';
import {CustomerService} from '../service/customer.service';
import {BalanceService} from '../service/balance.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  withdrawForm: FormGroup;
  transactionPayload: TransactionPayload;

  constructor(private authenticationService: AuthenticationService,
              private customerService: CustomerService,
              private balanceService: BalanceService,
              private router: Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
    this.transactionPayload = {
      accountNo: '',
      amount: 0.0
    };
  }

  ngOnInit(): void {

    this.withdrawForm = new FormGroup({
      account: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')],
        this.checkAccountNo.bind(this)),
      amount: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')],
        this.checkCurrentBalance.bind(this))
    });
  }

  get account() {

    return this.withdrawForm.get('account');
  }

  get amount() {

    return this.withdrawForm.get('amount');
  }

  onSubmit(){

    this.spinner.show();

    this.transactionPayload.accountNo = this.account.value;
    this.transactionPayload.amount = this.amount.value;

    this.balanceService.withdraw(this.transactionPayload).subscribe(
      data => {
        this.spinner.hide();
        this.router.navigateByUrl('/home');
        this.toastr.success(data);
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Transaction Failed! Please try again.');
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

  checkCurrentBalance(control: FormControl){

    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        this.balanceService.checkCurrentBalance(this.account.value).subscribe(data => {
          if (data.balance < control.value){
            resolve({ isAmountInvalid: true });
          }
          else{
            resolve(null);
          }
        });
      }, 1000);
    });

    return promise;
  }
}
