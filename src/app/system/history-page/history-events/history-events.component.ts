import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../../shared/models/category.model';
import { BKPEvent } from '../../shared/models/event.model';

@Component({
  selector: 'bkp-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: BKPEvent[] = [];

  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((e)=>{
      e.catName = this.categories.find(c => c.id === e.category).name;
    })
  }

  getEventClass(e: BKPEvent){
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    };
  }

  changeCriteria(field: string){
    const nameMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };
    this.searchPlaceholder = nameMap[field];
    this.searchField = field;
  }

  
}
