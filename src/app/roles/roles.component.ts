import { Component, OnInit } from '@angular/core';
import {RoleResponse} from '../response/role-response';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {RoleService} from '../service/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles: Array<RoleResponse>;

  constructor(private authenticationService: AuthenticationService,
              private roleService: RoleService,
              private router: Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    if (!this.authenticationService.isAdmin()){
      this.router.navigateByUrl('/home');
    }

    this.getRoles();
  }

  getRoles() {

    this.spinner.show();
    this.roleService.getRoles().subscribe(
      data => {
        this.roles = data;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }

}
