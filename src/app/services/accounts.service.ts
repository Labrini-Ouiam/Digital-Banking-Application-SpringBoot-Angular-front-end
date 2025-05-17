import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountDetails} from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  backendhost = "http://localhost:8085";

  constructor( private hhtp :HttpClient) { }

  public getAccount ( accountId : String,page : number,size : number): Observable<AccountDetails>{
    return this.hhtp.get<AccountDetails>(this.backendhost+"/accounts/"+accountId+"/pageoperations?page="+page+"&size="+size);
  }

  public debit ( accountId : String, amount : number ,description : String){
    let data={accountId :accountId,amount:amount,description:description}
    return this.hhtp.post(this.backendhost+"/accounts/debit",data);
  }

  public credit ( accountId : String, amount : number ,description : String){
    let data={accountId :accountId,amount:amount,description:description}
    return this.hhtp.post(this.backendhost+"/accounts/credit",data);
  }

  public transfer ( accountSource : String,accountDestination : String, amount : number ,description : String){
    let data={accountSource,accountDestination,amount,description}
    return this.hhtp.post(this.backendhost+"/accounts/transfer",data);
  }



}
