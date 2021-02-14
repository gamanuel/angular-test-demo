import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditCard } from '../model/credit-card';

@Injectable({
  providedIn: 'root'
})
export class CreditcardService {

  constructor(private http: HttpClient) { }


  creditCardData(creditCard: CreditCard){
    return this.http.post('https://jsonplaceholder.typicode.com/todos/1',creditCard);
  }

}
