import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { Category } from '../../shared/models/category.model';
import { BKPEvent } from '../../shared/models/event.model';

@Component({
  selector: 'bkp-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];
  types=[
    { type: 'income', label: 'Доход'},
    { type: 'outcome', label: 'Расход'}
  ];

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    let { amount, description, type, category} = form.value;
    if( amount < 0 ) amount *= -1;
    let date = moment().format('DD.MM.YYYY HH:mm:ss')

    const event = new BKPEvent(
      type, 
      amount, 
      +category, 
      date, 
      description, 
    );

    console.log(event);
  }

}
