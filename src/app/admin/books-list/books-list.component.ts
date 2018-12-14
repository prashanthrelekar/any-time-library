import { Component, OnInit } from '@angular/core';

import { AdminService } from '../admin.service';
import { Book } from '../../model/book.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  booksListArr: Book[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {

    this.adminService.getAllBooks().subscribe((data: Book[]) => {
      this.booksListArr = data;
    })

  }

}
