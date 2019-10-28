import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bill } from '../models/bill.model';
import { BaseApi } from 'src/app/shared/core/base-api';

@Injectable()

export class BillService extends BaseApi{

  constructor(public http: HttpClient){
    super(http);
  }

  getBill(): Observable<Bill>{
    return this.get('bill');
  }

  updateBill(bill: Bill): Observable<Bill>{
    return this.put('bill', bill);
  }

  getCurrency(base: string = "EUR"): Observable<any>{
    return this.http.get(`http://data.fixer.io/api//latest?access_key=b4a5fcab3a4302439d031bb75d46474b&base=${base}&symbols=USD,RUB`)
  }
}