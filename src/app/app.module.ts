import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {NgxSpinnerModule} from 'ngx-spinner';
import {TokenInterceptor} from './interceptor/token-interceptor';
import { UsersComponent } from './users/users.component';
import { CustomersComponent } from './customers/customers.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { HistoryComponent } from './history/history.component';
import { BalanceComponent } from './balance/balance.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerUploadComponent } from './customer-upload/customer-upload.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AssignMenuComponent } from './assign-menu/assign-menu.component';
import { RolesComponent } from './roles/roles.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    CreateUserComponent,
    ChangePasswordComponent,
    UsersComponent,
    CustomersComponent,
    DepositComponent,
    WithdrawComponent,
    HistoryComponent,
    BalanceComponent,
    CreateCustomerComponent,
    SearchCustomerComponent,
    CustomerDetailComponent,
    CustomerUploadComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    AssignMenuComponent,
    RolesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    NgxWebstorageModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
