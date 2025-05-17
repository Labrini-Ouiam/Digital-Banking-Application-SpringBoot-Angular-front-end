import { Routes } from '@angular/router';
import {CustomersComponent} from './customers/customers.component';
import {AccountsComponent} from './accounts/accounts.component';
import {NavbarComponent} from './navbar/navbar.component';
import {NewCustomerComponent} from './new-customer/new-customer.component';
import {CustomerAccountsComponent} from './customer-accounts/customer-accounts.component';
import {LoginComponent} from './login/login.component';
import {AdminTemplateComponent} from './admin-template/admin-template.component';

// Define the routes for the application
export const routes: Routes = [
  {path :"login", component: LoginComponent},
  {path :"", redirectTo:"/login", pathMatch:"full"},
  {path :"admin", component: AdminTemplateComponent , children :[
      {path :"customers", component: CustomersComponent},
      {path : "accounts",component : AccountsComponent},
      {path : "new-customer",component : NewCustomerComponent},
      {path:"customer-accounts/:id",component : CustomerAccountsComponent},
      {path : "navbar",component : NavbarComponent},
    ]}

  //{path : "/",component : NavbarComponent}

];
