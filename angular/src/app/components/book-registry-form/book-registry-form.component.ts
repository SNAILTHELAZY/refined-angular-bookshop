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
  valid_extensions=['png','jpg','jpeg'];
  isExtValid:boolean;
  file;
  genres=['fable','sci-fi','technical','fiction'];

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
    if(this.form.valid && (this.form.value.cover==='' || this.isExtValid)){
      this.valid=true;
    }
  }

  onFileSelect(event){
    var file=event.target.files[0];
    var ext=file.name.substring(file.name.lastIndexOf('.')+1);
    if(this.valid_extensions.includes(ext)){
      this.file=file;
      this.isExtValid=true;
    }else{
      this.isExtValid=false;
    }
  }

  onSubmit(){
    //console.log(this.form.value);
    const formData=new FormData();
    formData.append('book',JSON.stringify({
      title:this.form.value.title,
      author:this.form.value.author,
      genre:this.form.value.genre,
      description:this.form.value.description,
      pages:this.form.value.pages,
      publishDate:this.form.value.publishDate
    }));
    if(this.file!=null){
      formData.append('cover',this.file,this.file.name);
    }
    this.activeModal.close(formData);
  }

}
