import { Component, OnInit } from '@angular/core';
import {ProductService} from '../service/product.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductResponse} from '../response/product-response';
import {CustomerPayload} from '../payload/customer-payload';
import {CustomerService} from '../service/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  customerForm: FormGroup;
  customerPayload: CustomerPayload;
  products: Array<ProductResponse>;

  constructor(private customerService: CustomerService,
              private productService: ProductService,
              private router: Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
    this.customerPayload = {
      productId: 0,
      fullName: '',
      dob: '',
      nidNo: '',
      fatherName: '',
      motherName: '',
      address: '',
      phoneNo: ''
    };
  }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      fullname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      dob: new FormControl('', [Validators.required, Validators.minLength(3)]),
      nid: new FormControl('', [Validators.required, Validators.minLength(3)]),
      fathername: new FormControl('', [Validators.required, Validators.minLength(3)]),
      mothername: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(3)]),
      address: new FormControl('', [Validators.required, Validators.minLength(3)]),
      product: new FormControl('', [Validators.required])
    });

    this.getProducts();
  }

  getProducts(){

    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  get fullname() {

    return this.customerForm.get('fullname');
  }

  get dob() {

    return this.customerForm.get('dob');
  }

  get nid() {

    return this.customerForm.get('fullname');
  }

  get fathername() {

    return this.customerForm.get('fathername');
  }

  get mothername() {

    return this.customerForm.get('mothername');
  }

  get phone() {

    return this.customerForm.get('phone');
  }

  get address() {

    return this.customerForm.get('address');
  }

  get product() {

    return this.customerForm.get('product');
  }

  onSubmit(){

    this.spinner.show();

    this.customerPayload.productId = this.product.value;
    this.customerPayload.fullName = this.fullname.value;
    this.customerPayload.dob = this.dob.value;
    this.customerPayload.nidNo = this.nid.value;
    this.customerPayload.fatherName = this.fathername.value;
    this.customerPayload.motherName = this.mothername.value;
    this.customerPayload.phoneNo = this.phone.value;
    this.customerPayload.address = this.address.value;

    this.customerService.createCustomer(this.customerPayload).subscribe(
      data => {
        this.spinner.hide();
        this.router.navigateByUrl('/customers');
        this.toastr.success('Customer Created');
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Customer Creation Failed! Please try again.');
      }
    );
  }
}
