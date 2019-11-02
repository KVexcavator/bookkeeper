import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';



@Component({
  selector: 'bkp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private userService: UsersService,
    private route: Router,
    private title: Title
  ) { 
    title.setTitle('Регистрация');
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [
        Validators.required,
        Validators.email],
        this.forbbidenEmails.bind(this)
      ),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      'name': new FormControl(null, [
        Validators.required
      ]),
      'agree': new FormControl(false, [
        Validators.requiredTrue
      ]),
    })
  }

  onSubmit(){
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);

    this.userService.createNewUser(user)
      .subscribe((user: User)=>{
        this.route.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        });
      })
  }

  forbbidenEmails(control: FormControl): Promise<any>{
    return new Promise((resolve, reject)=>{
      this.userService.getUserByEmail(control.value)
        .subscribe((user: User)=>{
          if(user){
            resolve({forbbidenEmail: true});
            console.log(user)
          }else{
            resolve(null);
          }
        })
    })
  }

}
