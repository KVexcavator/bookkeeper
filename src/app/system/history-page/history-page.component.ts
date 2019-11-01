import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import * as moment from 'moment';

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
  filteredEvents: BKPEvent[] = [];
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
      this.setOriginalEvents();
      this.calculateChartDate();      
      // after complete
      this.isLoaded = true;
    })
  }

  calculateChartDate(): void {
    this.chartDate = [];
    this.categories.forEach((cat) => {
      const catEvents = this.filteredEvents
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

  private setOriginalEvents(){
    this.filteredEvents = this.events.slice();
  }

  openFilter(){
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData){
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    const startPeriod = moment().startOf(filterData.period).startOf("d");
    const endPeriod = moment().endOf(filterData.period).endOf("d");
    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod)
      })
    this.calculateChartDate();
  }

  onFilterCancel(){
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartDate();
  }

  ngOnDestroy(): void {
    if(this.sub_1) this.sub_1.unsubscribe();
  }


}
