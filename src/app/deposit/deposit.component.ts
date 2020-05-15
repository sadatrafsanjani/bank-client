import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {CustomerService} from '../service/customer.service';
import {TransactionPayload} from '../payload/transaction-payload';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BalanceService} from '../service/balance.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  depositForm: FormGroup;
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

    this.depositForm = new FormGroup({
      account: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')],
        this.checkAccountNo.bind(this)),
      amount: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }

  get account() {

    return this.depositForm.get('account');
  }

  get amount() {

    return this.depositForm.get('amount');
  }

  onSubmit(){

    this.spinner.show();

    this.transactionPayload.accountNo = this.account.value;
    this.transactionPayload.amount = this.amount.value;

    this.balanceService.deposit(this.transactionPayload).subscribe(
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
}
