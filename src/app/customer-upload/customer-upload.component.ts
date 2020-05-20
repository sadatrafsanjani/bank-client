import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {UploadService} from '../service/upload.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadPayload} from '../payload/upload-payload';

@Component({
  selector: 'app-customer-upload',
  templateUrl: './customer-upload.component.html',
  styleUrls: ['./customer-upload.component.css']
})
export class CustomerUploadComponent implements OnInit {

  id: number;
  uploadForm: FormGroup;
  uploadPayload: UploadPayload;
  nidFile: string;
  pictureFile: string;
  formData = new FormData();

  constructor(private uploadService: UploadService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
    this.uploadPayload = {
      customerId: 0,
      nid: null,
      picture: null
    };
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

    const reader = new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);

    reader.onload = function(){
      const buffer = this.result;
      const array = new Uint8Array(buffer as ArrayBuffer);

      return  String.fromCharCode.apply(null, array);
    };
  }

  onPictureChange(event) {

  }

  onSubmit(){

    console.log(this.formData);

    /*this.uploadService.uploadFiles(this.uploadPayload).subscribe(data => {
      console.log('');
    });*/

  }

  convertToBuffer(data) {


  }
}
