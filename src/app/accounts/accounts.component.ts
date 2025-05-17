import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AccountsService} from '../services/accounts.service';
import {catchError, Observable, throwError} from 'rxjs';
import {AccountDetails} from '../model/account.model';
import {AsyncPipe, DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-accounts',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    DecimalPipe,
    NgForOf,
    DatePipe,
    NgClass
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{

  accountFormGroup !: FormGroup;
  page = 0;
  size = 5;
  accountObservable! : Observable<AccountDetails>
  operationsFormGroup !: FormGroup;
  errormessage !: string;

  constructor(private fb: FormBuilder,private accountService:AccountsService) {
  }

  ngOnInit(): void {
    this.accountFormGroup= this.fb.group({
      accountId : this.fb.control('')
    });

    this.operationsFormGroup = this.fb.group({
      operationType : this.fb.control(null),
      amount : this.fb.control(0),
      description : this.fb.control(null),
      accountDestination : this.fb.control(null)
    });
  }

  handleSearchAccount() {
    let accountId = this.accountFormGroup.value.accountId;
    this.accountObservable=this.accountService.getAccount(accountId,this.page,this.size).pipe(
      catchError(err => {
        this.errormessage = err.message;
        return throwError(err);
      })
    );
  }

  gotopage(page:number) {
    this.page = page;
    this.handleSearchAccount();
  }

  handleaccountOperations() {
    let accountId = this.accountFormGroup.value.accountId;
    let operationType = this.operationsFormGroup.value.operationType;
    let amount = this.operationsFormGroup.value.amount;
    let description = this.operationsFormGroup.value.description;
    let accountDestination = this.operationsFormGroup.value.accountDestination;
    if (operationType == "DEBIT") {
      this.accountService.debit(accountId, amount, description).subscribe({
        next: () => {
          alert("Debit operation done");
          this.handleSearchAccount();
          this.operationsFormGroup.reset();
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else if (operationType == "CREDIT") {
      this.accountService.credit(accountId, amount, description).subscribe({
        next: () => {
          alert("Credit operation done");
          this.handleSearchAccount();
          this.operationsFormGroup.reset();
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else if (operationType == "TRANSFER") {
      this.accountService.transfer(accountId, accountDestination, amount, description).subscribe({
        next: () => {
          alert("Transfer operation done");
          this.handleSearchAccount();
          this.operationsFormGroup.reset();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
