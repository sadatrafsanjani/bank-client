import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../service/customer.service';
import {CustomerResponse} from '../response/customer-response';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Array<CustomerResponse>;
  customer: CustomerResponse;

  constructor(private customerService: CustomerService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.spinner.show();
    this.customerService.getCustomers().subscribe(data => {
        this.customers = data;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }
}
