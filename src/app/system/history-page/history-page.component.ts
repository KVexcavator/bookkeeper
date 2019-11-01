import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';

import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { BKPEvent } from '../shared/models/event.model';


@Component({
  selector: 'bkp-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  sub_1: Subscription;
  isLoaded = false;
  categories: Category[] = [];
  events: BKPEvent[] = [];
  chartDate = [];
  isFilterVisible = false;

  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.sub_1 = combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((date: [ Category[], BKPEvent[] ]) => {
      this.categories = date[0];
      this.events = date[1];
      this.calculateChartDate();
      // after complete
      this.isLoaded = true;
    })
  }

  calculateChartDate(): void {
    this.chartDate = [];
    this.categories.forEach((cat) => {
      const catEvents = this.events
        .filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartDate.push({
        "name": cat.name,
        "value": catEvents.reduce((total,e) => {
          total += e.amount;
          return total;
        },0)
      })
    })
  }

  private toggleFilterVisibility(nav: boolean){
    this.isFilterVisible = nav;
  }

  openFilter(){
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData){
    console.log(filterData);
  }

  onFilterCancel(){
    this.toggleFilterVisibility(false);
  }

  ngOnDestroy(): void {
    if(this.sub_1) this.sub_1.unsubscribe();
  }


}
