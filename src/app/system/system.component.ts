import { Component, HostBinding } from "@angular/core";

import { fadeStateTrigger } from '../shared/aminations/fade.animation';

@Component({
  selector: 'bkp-system',
  templateUrl: './system.component.html',
  animations: [fadeStateTrigger]
})

export class SystemComponent {
  @HostBinding('@fade') a = true;
}