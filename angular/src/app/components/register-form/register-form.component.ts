import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {User} from 'src/app/interfaces/user';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  form:FormGroup
  @Output() submit=new EventEmitter<User>();

  constructor(private fb:FormBuilder) {
    this.form=this.fb.group({
      username:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
   }

  onSubmit(){
    if(!this.form.errors){
      const user={
        username:this.form.value.username,
        password:this.form.value.password
      };
      this.submit.emit(user);
      //console.log('form emitted');
    }
  }
}
