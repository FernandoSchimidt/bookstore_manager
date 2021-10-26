import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { Author } from '../authors/Author.model';
import { PageAuthors } from '../authors/PageAuthors';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  readonly url = environment.apiURL + 'author'

  constructor(
    private http: HttpClient
  ) { }

  pageAuthor(page: any, size: any): Observable<PageAuthors> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
    return this.http.get<any>(`${this.url}?${params.toString()}`)
  }
  getall(): Observable<Author[]> {
    return this.http.get<Author[]>(this.url + '/all')
  }

  save(author: Author): Observable<Author> {
    return this.http.post<Author>(this.url, author)
  }
}
