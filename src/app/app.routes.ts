import { Routes } from '@angular/router';
import {CustomersComponent} from './customers/customers.component';
import {AccountsComponent} from './accounts/accounts.component';
import {NavbarComponent} from './navbar/navbar.component';
import {NewCustomerComponent} from './new-customer/new-customer.component';

// Define the routes for the application
export const routes: Routes = [
  {path :"customers", component: CustomersComponent},
  {path : "accounts",component : AccountsComponent},
  {path : "new-customer",component : NewCustomerComponent},
  //{path : "/",component : NavbarComponent}

];
