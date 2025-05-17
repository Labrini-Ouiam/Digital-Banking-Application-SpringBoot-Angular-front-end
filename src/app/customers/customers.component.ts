import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from '@angular/common';
import {CustomersService} from '../services/customers.service';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Customer} from '../model/cutomer.model';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customers',
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    ReactiveFormsModule,
    // Import NgIf for conditional rendering in templates
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {

  customers!: Observable<Array<Customer>>; // Observable to hold customer data
  errorMessage!: object;
  searchformGroup : FormGroup | undefined; // FormGroup to manage form data

  constructor( private costomerService :CustomersService ,private fb :FormBuilder,private router:Router) {}// Inject the CustomersService to fetch customer data

  ngOnInit() {
    this.searchformGroup=this.fb.group({
        keyword: this.fb.control("")// Form control for keyword input
      }
    );

    // this.customers=this.costomerService.getCustomers().pipe(
    //   catchError(error => {
    //     this.errorMessage=error.message;
    //     return throwError(error);
    //   })
    //);// call the service method to fetch customer data and type of response is observable
    this.handelSearchCustomers();
  }

  handelSearchCustomers() {
    let keyword = this.searchformGroup?.value.keyword; // Get the keyword from the form
    this.customers = this.costomerService.SearchCustomers(keyword).pipe(
      catchError(error => {
        this.errorMessage=error.message;
        return throwError(error);
      })
    ); // Call the service method to search for customers based on the keyword
  }

  handleDeleteCustomer(id: number) {
      this.costomerService.deleteCustomer(id).subscribe({
        next: (data) => {
          alert("Customer has been deleted successfully");
          this.handelSearchCustomers(); // Refresh the customer list after deletion
          // next : () => {
          //   this.customers=this.customers.pipe(
          //     map(data =>{
          //       let index = data.findIndex(c => c.id === id); // Find the index of the deleted customer
          //       data.splice(index, 1); // Remove the customer from the list
          //       return data; // Return the updated customer list
          //     })
          //   )
        },
        error: (error) => {
          alert("Error while deleting customer");
        }
      });
  }

  handleCustomerAccounts(id: number) {
    this.router.navigateByUrl("/customer-accounts/"+id); // Navigate to the customer accounts page with the selected customer ID
  }

  // ngOnInit() {
  //   this.costomerService.getCustomers().subscribe({
  //     next : (data) => {
  //       this.customers = data; // Assign the fetched data to the customers property
  //     },
  //     error: (error) => {
  //       this.errorMessage=error;
  //     }
  // }
  // ); // Call the service method to fetch customer data
  // }

}

