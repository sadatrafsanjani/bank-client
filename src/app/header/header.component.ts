import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { faUser, faLock, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navigation: string;
  profilePicture: any;
  faUser = faUser;
  faLock = faLock;
  faSignOutAlt = faSignOutAlt;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit(): void {

    if (this.authenticationService.isAdmin()){
      this.navigation = '/dashboard';
    }
    else if (this.authenticationService.isUser()){
      this.navigation = '/home';
    }
    else{
      this.navigation = '/';
    }

    this.loadProfilePicture();
  }

  private loadProfilePicture(){

    const picture = this.authenticationService.loadProfilePicture();

    if (picture != null){
      this.profilePicture = 'data:image/jpeg;base64,' + picture;
    }
  }

  isAdmin(): boolean {

    return this.authenticationService.isAdmin();
  }

  isAuthenticated(): boolean {

    return this.authenticationService.isAuthenticated();
  }

  logout(){

    this.authenticationService.logout().subscribe(data => {
        if (data) {
          this.router.navigateByUrl('/');
          this.toastr.success('Logged out successfully!');
        }
      },
      error => {
        this.toastr.error('Logout Failed!');
      }
    );
  }

  getCurrentUser(){

    return this.authenticationService.getUserName();
  }
}
