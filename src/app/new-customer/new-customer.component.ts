import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CustomersService} from '../services/customers.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-customer',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit{
  newCustomerForm!: FormGroup; // FormGroup to manage form data
  constructor( private fb: FormBuilder,private customerService: CustomersService, private router: Router) {}// Inject the CustomersService to fetch customer data

  ngOnInit(): void {
    this.newCustomerForm = this.fb.group({
      name: this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      email: this.fb.control(null,[Validators.required,Validators.email]),
    });
  }


  handleSaveCutomer() {
    let customer = this.newCustomerForm.value; // Get the form data
    this.customerService.saveCustomer(customer).subscribe({
      next: (data) => {
        alert("Customer has been saved successfully");
        this.router.navigateByUrl("/customers"); // Navigate to the customers list after saving
      },
      error: (error) => {
        alert("Error while saving customer");
      }
    });
  }
}
