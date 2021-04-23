import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BooksComponent } from './components/books/books.component';
import { UpdateModalFormComponent } from './components/update-modal-form/update-modal-form.component';
import { DeleteModalFormComponent } from './components/delete-modal-form/delete-modal-form.component';
import { BookRegistryFormComponent } from './components/book-registry-form/book-registry-form.component';
import { AuthenticationFormComponent } from './components/authentication-form/authentication-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';

import {ReactiveFormsModule,FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    UpdateModalFormComponent,
    DeleteModalFormComponent,
    BookRegistryFormComponent,
    AuthenticationFormComponent,
    RegisterFormComponent,
    SigninFormComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
