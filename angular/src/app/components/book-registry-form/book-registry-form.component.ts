import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-registry-form',
  templateUrl: './book-registry-form.component.html',
  styleUrls: ['./book-registry-form.component.css']
})
export class BookRegistryFormComponent implements OnInit {
  form:FormGroup
  valid:boolean;

  constructor(public activeModal:NgbActiveModal,private fb:FormBuilder) {
    this.form=this.fb.group({
      title:['',Validators.required],
      author:['',Validators.required],
      genre:['',Validators.required],
      pages:[''],
      publishDate:[''],
      description:[''],
      cover:['']
    })
    this.valid=this.form.valid;
   }

  ngOnInit(): void {
  }

  checkValid(){
    this.valid=this.form.valid;
  }

  onSubmit(){
    //console.log(this.form.value);
    this.activeModal.close({
      title:this.form.value.title,
      author:this.form.value.author,
      genre:this.form.value.genre,
      description:this.form.value.description,
      pages:this.form.value.pages,
      cover:this.form.value.cover,
      publishDate:this.form.value.publishDate
    })
  }

}
