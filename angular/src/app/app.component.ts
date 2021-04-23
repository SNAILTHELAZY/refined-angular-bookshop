import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationFormComponent } from './components/authentication-form/authentication-form.component';
import { BookRegistryFormComponent } from './components/book-registry-form/book-registry-form.component';
import { DeleteModalFormComponent } from './components/delete-modal-form/delete-modal-form.component';
import { UpdateModalFormComponent } from './components/update-modal-form/update-modal-form.component';
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
  books=[];
  ids=[];
  message:string;

  constructor(private modalService:NgbModal,private http:HttpService){
    
  }

  ngOnInit(){
    this.http.checkLogin().toPromise()
    .then((res:any)=>{
      this.isAuth=res.isAuth;
    }).catch(err=>console.error(err));

    this.http.getBooks().toPromise()
    .then((res:any)=>{
      res.forEach((element)=>{
        this.books.push(element);
      })
      //console.log(this.books);
      //console.log(res)
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
      console.log(res);
      //console.log(res.get('cover'));
      //console.log(res.get('book'));
      this.message=null;
      
      this.http.createBook(res).toPromise()
      .then((res:any)=>{
        this.message=res.message;
        this.books=res.books;
      })
      .catch(err=>console.error(err));
      
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

  openDelForm(event){
    //console.log(this.books[this.books.indexOf(event)]);
    const book=this.books[this.books.indexOf(event)];
    const delModal=this.modalService.open(DeleteModalFormComponent);
    delModal.componentInstance.book=book;

    this.message=null;

    delModal.result
    .then(res=>{
      //console.log(res);
      this.http.deleteBooks(res._id).toPromise()
      .then((res:any)=>{
        console.log(res);
        this.message=res.message;
        this.books=res.books;
      })
      .catch(err=>console.error(err));
    })
    .catch(err=>console.error(err));
  }

  openUpdateForm(event){
    const oldBook=this.books[this.books.indexOf(event)];
    const updateModal=this.modalService.open(UpdateModalFormComponent);
    updateModal.componentInstance.oldBook=oldBook;
    updateModal.result.then(res=>{
      this.http.updateBooks(oldBook._id,res).toPromise()
      .then((res:any)=>{
        this.message=res.message;
        this.books=res.books;
      })
      .catch(err=>console.error(err));
    }).catch(err=>console.error(err));
  }
}
