import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BooksComponent } from './components/books/books.component';
import { UpdateModalFormComponent } from './components/update-modal-form/update-modal-form.component';
import { DeleteModalFormComponent } from './components/delete-modal-form/delete-modal-form.component';
import { BookRegistryFormComponent } from './components/book-registry-form/book-registry-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    UpdateModalFormComponent,
    DeleteModalFormComponent,
    BookRegistryFormComponent,
    RegistrationFormComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
