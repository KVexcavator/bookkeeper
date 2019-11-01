import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'bkp-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();
  @Input() categories: Category[] = [];
  selectedPeriod = 'd';

  timePeriods = [
    { type: 'd', label: 'День' },
    { type: 'w', label: 'Неделя' },
    { type: 'M', label: 'Месяц' },
    { type: 'Y', label: 'Год' }
  ];

  types = [
    { type: 'income', label: 'доход'},
    { type: 'outcome', label: 'расход'}
  ];

  constructor() { }

  ngOnInit() {
  }

  handleChangeType(target){

  }

  handleChangeCategory(target){}

  closeFilter(){
    this.onFilterCancel.emit();
  }

}
