import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  isUser() {
    return this.authenticationService.isUser();
  }

  isAllowed(id: number){
    return this.authenticationService.isAllowed(id);
  }
}
