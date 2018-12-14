import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AdminComponent } from './admin.component';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'books', component: BooksListComponent },
            { path: 'book/add', component: AddEditBookComponent },
            { path: 'book/edit/:id', component: AddEditBookComponent },
            { path: 'book/:id', component: BookDetailComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {

}