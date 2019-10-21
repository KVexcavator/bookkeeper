import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[bkpDrowpdown]',

})

export class DrowpdownDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') onClick (){
    this.isOpen = !this.isOpen;
  }
  
}