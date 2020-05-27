import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {UploadService} from '../service/upload.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-customer-upload',
  templateUrl: './customer-upload.component.html',
  styleUrls: ['./customer-upload.component.css']
})
export class CustomerUploadComponent implements OnInit {

  id: number;
  uploadForm: FormGroup;
  nidFile: File = null;
  pictureFile: File = null;
  nidPreview: any;
  picturePreview: any;

  constructor(private uploadService: UploadService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params[`id`];
    });

    this.uploadForm = new FormGroup({
      nid: new FormControl('', [Validators.required]),
      picture: new FormControl('', [Validators.required])
    });
  }

  onNidChange(event) {

    this.nidFile = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.nidPreview = e.target.result;
    };

    reader.readAsDataURL(this.nidFile);
  }

  onPictureChange(event) {

    this.pictureFile = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.picturePreview = e.target.result;
    };

    reader.readAsDataURL(this.pictureFile);
  }

  onSubmit(){

    this.spinner.show();

    const formData = new FormData();
    formData.append('nid', this.nidFile);
    formData.append('picture', this.pictureFile);

    this.uploadService.uploadFiles(this.id, formData).subscribe(data => {

      this.spinner.hide();

      if (data.status === 204){
          this.toastr.success('Upload Successful!');
          this.router.navigateByUrl('customer-detail/' + this.id);
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
}
