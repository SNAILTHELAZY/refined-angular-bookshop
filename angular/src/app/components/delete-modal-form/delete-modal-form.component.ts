import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal-form',
  templateUrl: './delete-modal-form.component.html',
  styleUrls: ['./delete-modal-form.component.css']
})
export class DeleteModalFormComponent implements OnInit {
  @Input() book:any;
  constructor(public activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }

}
