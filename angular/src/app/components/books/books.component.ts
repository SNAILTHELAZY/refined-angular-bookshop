import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/interfaces/book';

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
  
  constructor() { }

  ngOnInit(): void {
  }

  onDelBtnClick(){
    this.deleteOpen.emit(this.book);
  }

  onUpdateBtnClick(){
    this.updateOpen.emit(this.book);
  }

}
