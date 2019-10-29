import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from "rxjs";

import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { BKPEvent } from '../shared/models/event.model';

@Component({
  selector: 'bkp-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {
  
  sub_1: Subscription;

  isLoaded = false;
  bill: Bill;
  category: Category[] = [];
  events: BKPEvent[] = [];

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.sub_1 = combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((date: [ Bill, Category[], BKPEvent[] ]) => {
      this.bill = date[0];
      this.category = date[1];
      this.events = date[2];
      // after complete
      this.isLoaded = true;
    })
  }

  ngOnDestroy(): void {
    if(this.sub_1) this.sub_1.unsubscribe();
  }

}
