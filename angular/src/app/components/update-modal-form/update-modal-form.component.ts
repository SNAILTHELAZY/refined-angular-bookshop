import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-modal-form',
  templateUrl: './update-modal-form.component.html',
  styleUrls: ['./update-modal-form.component.css']
})
export class UpdateModalFormComponent implements OnInit {
  form:FormGroup;
  @Input() oldBook;
  genres=['fable','sci-fi','technical','fiction'];
  valid_extensions=['png','jpg','jpeg'];
  isExtValid:boolean;
  file;

  constructor(public activeModal:NgbActiveModal,private fb:FormBuilder) {
    this.form=this.fb.group({
      title:[''],
      author:[''],
      genre:[''],
      description:[''],
      pages:[''],
      publishDate:[''],
      cover:['']
    })
   }

  ngOnInit(): void {
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
    const formData=new FormData();
    formData.set('book',JSON.stringify({
      title:this.form.value.title!='' ? this.form.value.title : this.oldBook.title,
      author:this.form.value.author!='' ? this.form.value.author : this.oldBook.author,
      genre:this.form.value.genre!='genre' ? this.form.value.genre : this.oldBook.genre,
      description:this.form.value.description!='' ? this.form.value.description : this.oldBook.description,
      pages:this.form.value.pages!='' ? this.form.value.pages : this.oldBook.pages,
      publishDate:this.form.value.publishDate!='' ? this.form.value.publishDate : this.oldBook.publishDate
    }));
    if(this.file!=null){
      formData.set('cover',this.file,this.file.name);
    }
    //console.log(formData.get('book'));
    //console.log(this.form.value.title);
    this.activeModal.close(formData);
  }

}
