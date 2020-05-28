import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserService} from '../service/user.service';
import {PictureResponse} from '../response/picture-response';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  picture: any;
  pictureFile: File = null;
  picturePreview: any;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.loadProfilePicture();
  }

  private loadProfilePicture(){

    const picture = this.authenticationService.loadProfilePicture();

    if (picture != null){
      this.picture = 'data:image/jpeg;base64,' + picture;
    }
  }

  openPictureBrowser(){

    $('#pictureBrowser').trigger('click');
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

    this.userService.updatePicture(this.authenticationService.getId(), formData).subscribe(data => {

        this.spinner.hide();

        if (data.status === 204){
          this.toastr.success('Update Successful!');
          this.getProfilePicture();
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

  private getProfilePicture(){

    this.userService.getUserProfilePicture(this.authenticationService.getId()).subscribe((data: PictureResponse) => {
        this.picture = 'data:image/jpeg;base64,' + data.picture;
        this.authenticationService.setProfilePicture(data.picture);
      },
      error => {
        this.toastr.error(error);
      }
    );
  }
}
