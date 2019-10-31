import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { EventsService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { BKPEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';


@Component({
  selector: 'bkp-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  
  sub_1: Subscription;
  isLoaded = false;
  event: BKPEvent;
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.sub_1 = this.route.params
     .pipe(
       mergeMap((params: Params)=> this.eventsService.getEventById(params['id'])),
       mergeMap((event: BKPEvent)=> {
         this.event = event;
         return this.categoriesService.getCategoryById(event.category)
       })
     )
    .subscribe(( category: Category ) => {
      this.category = category;
      this.isLoaded = true;
    })
  }

  ngOnDestroy(): void {
    if(this.sub_1) this.sub_1.unsubscribe();
  }

}
