import { Component, OnInit } from '@angular/core';
import {CustomerResponse} from '../response/customer-response';
import {CustomerService} from '../service/customer.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadResponse} from '../response/upload-response';
import {UploadService} from '../service/upload.service';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {

  accountForm: FormGroup;
  customer: CustomerResponse;
  nid: any;
  picture: any;

  constructor(private customerService: CustomerService,
              private uploadService: UploadService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {}

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

    this.customerService.getCustomerByAccountNo(this.account.value).subscribe((data: CustomerResponse) => {
        this.customer = data;
        this.spinner.hide();

        if (data.uploadStatus){
          this.getCustomerUpload(data.id);
        }
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

  private getCustomerUpload(id: number){

    this.spinner.show();

    this.uploadService.getUploadByCustomerId(id).subscribe((data: UploadResponse) => {

        this.nid = 'data:image/jpeg;base64,' + data.nid;
        this.picture = 'data:image/jpeg;base64,' + data.picture;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }
}
