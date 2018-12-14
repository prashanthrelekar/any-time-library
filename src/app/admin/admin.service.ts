import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 

import appConfig from '../app-config';
import { Book } from '../model/book.model';

@Injectable()
export class AdminService {

    constructor(private httpClient: HttpClient) {

    }

    getBookByISBN(isbn: number): Observable<any> {
        return this.httpClient.get<any>(appConfig.BOOK_API_URL + 'isbn:' + isbn + '&key=' + appConfig.BOOk_API_KEY);
    }

    getAllBooks(): Observable<Book[]> {
        return this.httpClient.get<Book[]>(appConfig.BOOKS_MOCK_URL + '/books');
    }

    getBookByID(bookId: number): Observable<Book> {
        return this.httpClient.get<Book>(appConfig.BOOKS_MOCK_URL + '/books/' + bookId);
    }

    saveBook(book: Book) {
        return this.httpClient.post(appConfig.BOOKS_MOCK_URL + '/books', book);
    }

    updateBook(bookId: number, updatedBook: Book) {
        return this.httpClient.put(appConfig.BOOKS_MOCK_URL + '/books/' + bookId, updatedBook);
    }

    deleteBook(bookId: number) {
        return this.httpClient.delete(appConfig.BOOKS_MOCK_URL + '/books/' + bookId);
    }
}