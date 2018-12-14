import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { AdminService } from '../admin.service';
import { Book } from '../../model/book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  bookId: number;
  bookDetail: Book;

  constructor(
    private activeRoute: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.bookId = +this.activeRoute.snapshot.paramMap.get('id');

    this.adminService.getBookByID(this.bookId).subscribe((data: Book) => {
      this.bookDetail = data;
    })
  }

  onBookDelete(bookDelId: number) {
    this.adminService.deleteBook(bookDelId).subscribe((data) => {
      this.router.navigate(['/admin/books']);
    })
  }

}
