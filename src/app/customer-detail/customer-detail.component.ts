import {Component, OnInit } from '@angular/core';
import {CustomerService} from '../service/customer.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {CustomerResponse} from '../response/customer-response';
import {ActivatedRoute} from '@angular/router';
import {UploadService} from '../service/upload.service';
import {UploadResponse} from '../response/upload-response';
import jsPDF from 'jspdf';

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
  nidFile: File = null;
  pictureFile: File = null;
  nidPreview: any;
  picturePreview: any;

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
  }

  private getCustomer(){

    this.spinner.show();

    this.customerService.getCustomer(this.id).subscribe((data: CustomerResponse) => {
        this.customer = data;
        this.spinner.hide();

        if (data.uploadStatus){
          this.getCustomerUpload();
        }
    },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }

  private getCustomerUpload(){

    this.uploadService.getUploadByCustomerId(this.id).subscribe((data: UploadResponse) => {
        this.nid = 'data:image/jpeg;base64,' + data.nid;
        this.picture = 'data:image/jpeg;base64,' + data.picture;
      },
      error => {
        this.toastr.error(error);
      }
    );
  }

  openPictureBrowser(){

    $('#pictureBrowser').trigger('click');
  }

  openNidBrowser(){

    $('#nidBrowser').trigger('click');
  }

  onPictureSelected(event) {

    this.pictureFile = event.target.files[0];

    if (this.pictureFile != null){

      $('#pictureModal').modal('show');

      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.picturePreview = e.target.result;
      };

      reader.readAsDataURL(this.pictureFile);
    }
  }

  onPictureUpdate(){

    $('#pictureModal').modal('hide');

    this.spinner.show();

    const formData = new FormData();
    formData.append('picture', this.pictureFile);

    this.uploadService.updatePicture(this.id, formData).subscribe(data => {

        this.spinner.hide();

        if (data.status === 204){
          this.toastr.success('Update Successful!');
          this.getCustomerUpload();
        }
        else{
          this.toastr.error('Upload Failed!');
        }
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }

  onNidSelected(event) {

    this.nidFile = event.target.files[0];

    if (this.nidFile != null){

      $('#nidModal').modal('show');

      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.nidPreview = e.target.result;
      };

      reader.readAsDataURL(this.nidFile);
    }
  }

  onNidUpdate(){

    $('#nidModal').modal('hide');

    this.spinner.show();

    const formData = new FormData();
    formData.append('nid', this.nidFile);

    this.uploadService.updateNid(this.id, formData).subscribe(data => {

        this.spinner.hide();

        if (data.status === 204){
          this.toastr.success('Update Successful!');
          this.getCustomerUpload();
        }
        else{
          this.toastr.error('Upload Failed!');
        }
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }

  zoomPicture(){

    $('#pictureZoomModal').modal('show');
  }

  zoomNid(){

    $('#nidZoomModal').modal('show');
  }

  generateReport(){

    const doc = new jsPDF();

    doc.addImage(this.picture, 'JPEG', 150, 10, 40, 40);
    doc.text('Name: ' + this.customer.fullName, 20, 20);
    doc.text('Account No: ' + this.customer.accountNo, 20, 30);
    doc.text('Account Type: ' + this.customer.accountType, 20, 40);
    doc.text('Balance: ' + this.customer.balance.toString() + 'BDT', 20, 50);
    doc.text('Date of Birth: ' + this.customer.dob, 20, 60);
    doc.text('NID No: ' + this.customer.nidNo, 20, 70);
    doc.text('Phone No: ' + this.customer.phoneNo, 20, 80);
    doc.text('Address: ' + this.customer.address, 20, 90);
    doc.text('Father Name: ' + this.customer.fatherName, 20, 100);
    doc.text('Mother Name: ' + this.customer.motherName, 20, 110);
    doc.save('customer.pdf');
  }
}
