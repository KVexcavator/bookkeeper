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

  private subcribtion: Subscription;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.subcribtion = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((date: [Bill, any])=>{
      console.log(date);
    })
  }

  ngOnDestroy(){
    this.subcribtion.unsubscribe();
  }

}
