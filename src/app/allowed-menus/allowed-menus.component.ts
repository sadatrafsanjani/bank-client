import { Component, OnInit } from '@angular/core';
import {AllowedMenuResponse} from '../response/allowed-menu-response';
import {AuthenticationService} from '../service/authentication.service';
import {UserService} from '../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-allowed-menus',
  templateUrl: './allowed-menus.component.html',
  styleUrls: ['./allowed-menus.component.css']
})
export class AllowedMenusComponent implements OnInit {

  id: number;
  menus: Array<AllowedMenuResponse>;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    if (!this.authenticationService.isAdmin()){
      this.router.navigateByUrl('/home');
    }

    this.route.params.subscribe(params => {
      this.id = params[`id`];
    });

    this.getAllowedMenus();
  }

  getAllowedMenus(){

    this.spinner.show();
    this.userService.getAllowedMenus(this.id).subscribe(data => {
      this.menus = data;

      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }
}
