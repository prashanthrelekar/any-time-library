import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { AdminService } from '../admin.service';
import { Book } from '../../model/book.model';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.scss']
})
export class AddEditBookComponent implements OnInit {

  bookId: number;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.bookId = +this.activeRoute.snapshot.paramMap.get('id');
    if(this.bookId) {
      this.populateBookEditForm(this.bookId);
    }
  }

  addEditBookForm = new FormGroup({
    isbn: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required)
  })

  onGetBookDetails(isbnVal: number) {
    this.adminService.getBookByISBN(isbnVal).subscribe((data) => {
      console.log('Book data from google', data);
      if (data.totalItems) {
        this.addEditBookForm.patchValue({
          title: data.items[0].volumeInfo.title ? data.items[0].volumeInfo.title : '',
          author: data.items[0].volumeInfo.authors ? data.items[0].volumeInfo.authors.join(',') : '',
          description: data.items[0].volumeInfo.description ? data.items[0].volumeInfo.description : '',
          imageUrl: data.items[0].volumeInfo.imageLinks.smallThumbnail ? data.items[0].volumeInfo.imageLinks.smallThumbnail : '',
          category: data.items[0].volumeInfo.categories ? data.items[0].volumeInfo.categories.join(',') : '',
          rating: data.items[0].volumeInfo.averageRating ? data.items[0].volumeInfo.averageRating : ''
        })
      }
      else {
        alert('Please enter valid ISBN number');
      }
    })
  }

  populateBookEditForm(id: number) {
    this.adminService.getBookByID(id).subscribe((data: Book) => {
      this.addEditBookForm.patchValue({
        isbn: data.isbn,
        title: data.title,
        author: data.author,
        description: data.description,
        imageUrl: data.imageUrl,
        category: data.category,
        rating: data.rating,
        quantity: data.quantity
      })  
    })
  }

  onAddEditkBookFormSubmit() {
    console.log('Form value', this.addEditBookForm.value);

    if (this.bookId) {
      this.addEditBookForm.value.id = this.bookId;
      this.adminService.updateBook(this.bookId, this.addEditBookForm.value).subscribe((data) => {
        this.router.navigate(['/admin/book/' + this.bookId]);
      })
    }
    else {
      this.addEditBookForm.value.id = Math.random();
      this.adminService.saveBook(this.addEditBookForm.value).subscribe((data) => {
        console.log('After Book add', data);
        this.router.navigate(['/admin/books']);
      },
      (error) => {
        console.log('Book save failed', error);
      })
    }

  }

}
