import { BaseApi } from 'src/app/shared/core/base-api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { BKPEvent } from '../models/event.model';


@Injectable()
export class EventsService extends BaseApi{

  constructor(public http: HttpClient){
    super(http);
  }

  addEvent(event: BKPEvent): Observable<BKPEvent>{
    return this.post('events', event);
  }


  getEvents(): Observable<BKPEvent[]>{
    return this.get('events');
  }

  getEventById(id: string): Observable<BKPEvent>{
    return this.get(`events/${id}`);
  }

}