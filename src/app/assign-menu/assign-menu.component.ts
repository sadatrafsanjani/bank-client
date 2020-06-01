import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {MenuResponse} from '../response/menu-response';
import {MenuService} from '../service/menu.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MenuPayload} from '../payload/menu-payload';
import {AuthenticationService} from '../service/authentication.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-assign-menu',
  templateUrl: './assign-menu.component.html',
  styleUrls: ['./assign-menu.component.css']
})
export class AssignMenuComponent implements OnInit {

  id: number;
  menus: Array<MenuResponse>;
  menuForm: FormGroup;
  menuPayload: MenuPayload;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private menuService: MenuService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
    this.menuPayload = {
      menus: []
    };
  }

  ngOnInit(): void {

    if (!this.authenticationService.isAdmin()){
      this.router.navigateByUrl('/home');
    }

    this.menuForm = new FormGroup({
      menu: new FormControl('', [Validators.required])
    });

    this.route.params.subscribe(params => {
      this.id = params[`id`];
    });

    this.getMenus();
  }

  get menu() {

    return this.menuForm.get('menu');
  }

  getMenus(){
    this.menuService.getUserMenus().subscribe(data => {
      this.menus = data;
    });
  }

  onSubmit(){

    this.spinner.show();
    this.menuPayload.menus = this.menu.value;

    this.userService.updateMenu(this.id, this.menuPayload).subscribe(
      data => {
        this.spinner.hide();
        this.toastr.success('Menu Updated!');
    },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }
}
