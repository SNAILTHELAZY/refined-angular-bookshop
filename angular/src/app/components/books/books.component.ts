import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Book } from 'src/app/interfaces/book';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  @Input() book:any;
  @Input() isAuth:boolean;
  @Output() updateOpen=new EventEmitter<any>();
  @Output() deleteOpen=new EventEmitter<any>(); 
  img;
  
  constructor(private http:HttpService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    console.log(this.book.cover)
    if(this.book.cover!='' && this.book.cover!=null && this.book.cover!=='undefined'){
      this.http.getBookCover(this.book.cover).toPromise()
      .then(blob=>{
        const imgURL=URL.createObjectURL(blob);
        this.img=this.sanitizer.bypassSecurityTrustUrl(imgURL);
      })
      .catch(err=>console.error(err));
    }
  }

  onDelBtnClick(){
    this.deleteOpen.emit(this.book);
  }

  onUpdateBtnClick(){
    this.updateOpen.emit(this.book);
  }

}
