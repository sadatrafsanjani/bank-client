import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../service/customer.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {CustomerResponse} from '../response/customer-response';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  id: number;
  customer: CustomerResponse;

  constructor(private customerService: CustomerService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params[`id`];
    });

    this.spinner.show();
    this.getCustomer();
  }

  private getCustomer(){

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

}
