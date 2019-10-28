import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { mergeMap } from 'rxjs/operators';

import { Category } from '../../shared/models/category.model';
import { BKPEvent } from '../../shared/models/event.model';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Message } from 'src/app/shared/models/message.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'bkp-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  sub_1: Subscription;
  sub_2: Subscription;

  @Input() categories: Category[] = [];
  types=[
    { type: 'income', label: 'Доход'},
    { type: 'outcome', label: 'Расход'}
  ];

  message: Message;

  constructor(
    private eventsService: EventsService,
    private billService: BillService
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private showMessage(text: string){
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 3000)
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
    
    this.sub_1 = this.billService.getBill()
      .subscribe((bill: Bill) =>{
        let value = 0;
        if(type === 'outcome'){
          if(amount > bill.value){
            this.showMessage(`Не достаточно средств, в сумме ${amount - bill.value }`);
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }

        this.sub_2 = this.billService.updateBill({ value: value, currency: bill.currency})
          .pipe(
            mergeMap(() => this.eventsService.addEvent(event))
          )
          .subscribe(()=>{
            form.setValue({
              amount: 0, 
              description: ' ', 
              type: 'outcome', 
              category: 1
            })
          })
      })

  }

  ngOnDestroy(): void {
    if(this.sub_1) this.sub_1.unsubscribe();
    if(this.sub_2) this.sub_2.unsubscribe();
  }

}
