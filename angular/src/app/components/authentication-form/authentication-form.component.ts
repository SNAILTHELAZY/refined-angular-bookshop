import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.css']
})
export class AuthenticationFormComponent implements OnInit {
  @Output() login=new EventEmitter<User>();
  @Output() register=new EventEmitter<User>();
  constructor(public activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }

  onLogin(user:User){
    //console.log(user);
    this.activeModal.close({event:'login',user:user});
  }
  onRegister(user:User){
    //console.log(user.username+' '+user.password);
    this.activeModal.close({event:'register',user:user});
  }
}
