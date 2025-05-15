import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../model/cutomer.model';

@Injectable({
  providedIn: 'root'// This service is provided in the root injector c'est pas l'appel de definire dans le provider
})
export class CustomersService {

  backendhost = "http://localhost:8085";

  constructor(private http:HttpClient) { }

  public getCustomers () : Observable<Array<Customer>>{ //la fonction getCustomers retourne un observable de type any
    return this.http.get<Array<Customer>>(this.backendhost+"/customers")
  }

  public SearchCustomers (keyword: String) : Observable<Array<Customer>>{ //la fonction getCustomers retourne un observable de type any
    return this.http.get<Array<Customer>>(this.backendhost+"/customers/search?keyword="+keyword)
  }

  public saveCustomer (customer : Customer) : Observable<Customer>{ //la fonction getCustomers retourne un observable de type any
    return this.http.post<Customer>(this.backendhost+"/customers",customer);
  }

  public deleteCustomer (customerId : number){ //la fonction getCustomers retourne un observable de type any
    return this.http.delete(this.backendhost+"/customers/"+customerId);
  }
}
