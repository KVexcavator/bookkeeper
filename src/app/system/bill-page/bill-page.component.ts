import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { Bill } from '../shared/models/bill.model';

@Component({
  selector: 'bkp-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  sub_1: Subscription;
  sub_2: Subscription;

  currency: any;
  bill: Bill;

  isLoaded = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.sub_1 = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((date: [Bill, any])=>{
      // console.log(date);
      this.bill = date[0];
      this.currency = date[1];
      this.isLoaded = true;
    })
  }

  onRefresh(){
    this.isLoaded = false;
    this.sub_2 = this.billService.getCurrency()
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      })
  }


  ngOnDestroy(){
    this.sub_1.unsubscribe();
    this.sub_2.unsubscribe();
  }


}
