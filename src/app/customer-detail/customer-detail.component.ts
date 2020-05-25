import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../service/customer.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {CustomerResponse} from '../response/customer-response';
import {ActivatedRoute} from '@angular/router';
import {UploadService} from '../service/upload.service';
import {UploadResponse} from '../response/upload-response';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  id: number;
  customer: CustomerResponse;
  nid: any;
  picture: any;

  constructor(private customerService: CustomerService,
              private uploadService: UploadService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params[`id`];
    });

    this.getCustomer();
    this.getCustomerUpload();
  }

  private getCustomer(){

    this.spinner.show();

    this.customerService.getCustomer(this.id).subscribe((data: CustomerResponse) => {
        this.customer = data;
        this.spinner.hide();
    },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }

  private getCustomerUpload(){

    this.spinner.show();

    this.uploadService.getUploadByCustomerId(this.id).subscribe((data: UploadResponse) => {

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
