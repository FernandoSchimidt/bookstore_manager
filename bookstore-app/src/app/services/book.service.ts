import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { Book } from '../books/Book.model';
import { PageBook } from '../books/PageBooks';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  readonly url = environment.apiURL + 'books'

  constructor(
    private http: HttpClient
  ) { }

  pageBooks(page: any, size: any): Observable<PageBook> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
    return this.http.get<any>(`${this.url}?${params.toString()}`)
  }
  save(book: Book): Observable<Book> {
    console.log(book)
    return this.http.post<Book>(this.url, book)
  }
}
