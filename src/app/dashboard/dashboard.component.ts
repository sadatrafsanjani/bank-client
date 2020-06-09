import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {ActuatorService} from '../service/actuator.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {HealthResponse} from '../response/health-response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private health: HealthResponse;

  constructor(private authenticationService: AuthenticationService,
              private actuatorService: ActuatorService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (!this.authenticationService.isAdmin()){
      this.router.navigateByUrl('/home');
    }

    this.getHealth();
  }

  getHealth(){

    this.spinner.show();
    this.actuatorService.health().subscribe((data) => {

      /*this.health.systemStatus = data.status;
      this.health.databaseStatus = data.components.db.status;
      this.health.databaseName = data.components.db.status;*/

      console.log(this.health);

      this.spinner.hide();
    });

  }

}
