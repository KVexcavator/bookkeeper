import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';

@Injectable()

export class BillService {

  constructor(private http: HttpClient){}

  getBill(): Observable<Bill>{
    return this.http.get<Bill>('http://localhost:3004/bill')
  }

  getCurrency(base: string = "EUR"): Observable<any>{
    return this.http.get(`http://data.fixer.io/api//latest?access_key=b4a5fcab3a4302439d031bb75d46474b&base=${base}&symbols=USD,RUB`)
  }
}