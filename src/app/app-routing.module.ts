import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {AuthenticationGuard} from './authentication.guard';
import {UsersComponent} from './users/users.component';
import {CustomersComponent} from './customers/customers.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {DepositComponent} from './deposit/deposit.component';
import {WithdrawComponent} from './withdraw/withdraw.component';
import {HistoryComponent} from './history/history.component';
import {BalanceComponent} from './balance/balance.component';
import {CreateCustomerComponent} from './create-customer/create-customer.component';
import {SearchCustomerComponent} from './search-customer/search-customer.component';
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {CustomerUploadComponent} from './customer-upload/customer-upload.component';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {AssignMenuComponent} from './assign-menu/assign-menu.component';
import {RolesComponent} from './roles/roles.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard]  },
  { path: 'create-user', component: CreateUserComponent, canActivate: [AuthenticationGuard]  },
  { path: 'users', component: UsersComponent, canActivate: [AuthenticationGuard]  },
  { path: 'roles', component: RolesComponent, canActivate: [AuthenticationGuard]  },
  { path: 'assign-menu/:id', component: AssignMenuComponent, canActivate: [AuthenticationGuard]  },
  { path: 'deposit', component: DepositComponent, canActivate: [AuthenticationGuard]  },
  { path: 'withdraw', component: WithdrawComponent, canActivate: [AuthenticationGuard]  },
  { path: 'history', component: HistoryComponent, canActivate: [AuthenticationGuard]  },
  { path: 'balance', component: BalanceComponent, canActivate: [AuthenticationGuard]  },
  { path: 'create-customer', component: CreateCustomerComponent, canActivate: [AuthenticationGuard]  },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthenticationGuard]  },
  { path: 'customer-detail/:id', component: CustomerDetailComponent, canActivate: [AuthenticationGuard]  },
  { path: 'customer-upload/:id', component: CustomerUploadComponent, canActivate: [AuthenticationGuard]  },
  { path: 'search-customer', component: SearchCustomerComponent, canActivate: [AuthenticationGuard]  },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthenticationGuard]  },
  { path: 'forget-password', component: ForgetPasswordComponent  },
  { path: 'reset-password', component: ResetPasswordComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
