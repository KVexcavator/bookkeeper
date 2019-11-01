import { Component, Output, EventEmitter, Input } from '@angular/core';

import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'bkp-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();
  @Input() categories: Category[] = [];
  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  timePeriods = [
    { type: 'd', label: 'День' },
    { type: 'w', label: 'Неделя' },
    { type: 'M', label: 'Месяц' },
    { type: 'y', label: 'Год' }
  ];

  types = [
    { type: 'income', label: 'доход'},
    { type: 'outcome', label: 'расход'}
  ];

  private calculateInputParams(fueld: string, checked: boolean, value: string){
    if(checked){
      this[fueld].indexOf(value) === -1 ? this[fueld].push(value): null;
    } else {
      this[fueld] = this[fueld].filter(item => item !== value)
    }
  }

  handleChangeType({checked, value}){
    this.calculateInputParams('selectedTypes', checked, value);
  }

  handleChangeCategory({checked, value}){
    this.calculateInputParams('selectedCategories', checked, value);
  }

  applyFilter(){
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

  closeFilter(){
    this.selectedPeriod = 'd';
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.onFilterCancel.emit();
  }

}
