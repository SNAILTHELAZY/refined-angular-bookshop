import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationFormComponent } from './components/authentication-form/authentication-form.component';
import { BookRegistryFormComponent } from './components/book-registry-form/book-registry-form.component';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular';
  public isCollapsed=true;
  public isAuth:boolean;

  constructor(private modalService:NgbModal,private http:HttpService){
    
  }

  ngOnInit(){
    this.http.checkLogin().toPromise()
    .then((res:any)=>{
      this.isAuth=res.isAuth;
    }).catch(err=>console.error(err));
  }

  openAuthForm(){
    const authModal=this.modalService.open(AuthenticationFormComponent,{size:'lg'});
    authModal.result.then(result=>{
      //console.log(result);
      switch(result.event){
        case 'register':
          this.http.register(result.user).toPromise()
          .then((res:any)=>{
            this.isAuth=true;
            //console.log(result);
            //this.isAuth=true;
          }).catch(err=>console.error(err));
          break;
        case 'login':
          this.http.login(result.user).toPromise()
          .then((res:any)=>{
            this.isAuth=true;
            //console.log(result);
            //this.isAuth=true;
          }).catch(err=>console.error(err));
          break;
      }
    }).catch(err=>{
      console.error(err);
    })
  }

  openBookRegForm(){
    const bookRegModal=this.modalService.open(BookRegistryFormComponent,{size:'lg'});
    bookRegModal.result.then(res=>{
      //console.log(res);
      const newBook={
        title:res.title,
        author:res.author,
        genre:res.genre,
        description:res.description,
        pages:res.pages,
        publishDate:res.publishDate,
        cover:res.cover
      }
      this.http.createBook(newBook);
    }).catch(err=>console.error(err));
  }

  logout(){
    this.http.logout().toPromise()
    .then((res:any)=>{
      this.isAuth=false;
      //console.log(result)
      //this.isAuth=false;
    }).catch(err=>console.error(err));
  }
}
