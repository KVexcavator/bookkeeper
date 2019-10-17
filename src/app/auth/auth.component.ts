import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'bkp-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit{

  constructor(private route: Router){}

  ngOnInit(){
    this.route.navigate(['/login'])
  }

}