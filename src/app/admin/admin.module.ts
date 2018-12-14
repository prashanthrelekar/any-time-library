import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { AdminRoutingModule } from './admin-routing.module';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';


@NgModule({
  declarations: [
    AdminComponent,
    AddEditBookComponent,
    BooksListComponent,
    BookDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  providers: [
    AdminService
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
