import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRegistryFormComponent } from './book-registry-form.component';

describe('BookRegistryFormComponent', () => {
  let component: BookRegistryFormComponent;
  let fixture: ComponentFixture<BookRegistryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookRegistryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRegistryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
