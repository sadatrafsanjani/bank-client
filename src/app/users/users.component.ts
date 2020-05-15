import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {UserResponse} from '../response/user-response';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<UserResponse>;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    if (!this.authenticationService.isAdmin()){
      this.router.navigateByUrl('/home');
    }

    this.getEmployees();
  }

  getEmployees() {
    this.spinner.show();
    this.userService.getEmployees().subscribe(
      data => {
        this.users = data;
        this.spinner.hide();
    },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }

  activate(id: number) {
    this.spinner.show();
    this.userService.activateUser(id).subscribe(data => {
      console.log(data);
    });
    this.spinner.hide();
  }

  deactivate(id: number) {
    this.spinner.show();
    this.userService.deactivateUser(id).subscribe(data => {
      console.log(data);
    });
    this.spinner.hide();
  }
}
