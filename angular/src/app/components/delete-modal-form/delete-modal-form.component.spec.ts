import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalFormComponent } from './delete-modal-form.component';

describe('DeleteModalFormComponent', () => {
  let component: DeleteModalFormComponent;
  let fixture: ComponentFixture<DeleteModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteModalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
