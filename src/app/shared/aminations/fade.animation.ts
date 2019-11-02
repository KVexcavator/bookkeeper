import { trigger, transition, style, animate } from '@angular/animations';

export const fadeStateTrigger = trigger('fade', [
  transition(':enter',[
    style({
      opacity: 0
    }),
    animate(600)
  ]),
  transition(':leave', animate(600, style({
    opacity: 0
  })))
]);